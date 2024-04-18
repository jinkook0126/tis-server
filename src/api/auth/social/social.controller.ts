import { generateSocialLoginLink } from '@/utils/social';
import { getGoogleAccessToken, getGoogleProfile } from '@/utils/social/google';
import { decodeToken, generateToken, setTokenCookie } from '@/utils/token';
import { Context } from 'koa';
import { checkDuplicateByuserId, findUserByMailAndProvider, registerUser } from './social.data';
import Joi from 'joi';
import { SocialRegisterToken } from '@/types/social';
import { generateUserToken } from '@/utils/users';

const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;
if (!GOOGLE_CLIENT_ID || !GOOGLE_SECRET) {
  throw new Error('GOOGLE ENVVAR is missing');
}
export const googleLoginCallback = async (ctx: Context, next: () => Promise<any>) => {
  const { code }: { code?: string } = ctx.query;
  if (!code) {
    ctx.status = 401;
    return;
  }
  try {
    const accessToken = await getGoogleAccessToken({
      code,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET,
      redirectUri: `http://localhost:3010/auth/social/google`,
    });
    const profile = await getGoogleProfile(accessToken);
    ctx.state.profile = profile;
    ctx.state.accessToken = accessToken;
    ctx.state.provider = 'google';
    return next();
  } catch (e) {
    console.log(e);
    ctx.throw('Internal Error', 500);
  }
};
export const socialLoginCallback = async (ctx: Context) => {
  try {
    const { profile, accessToken, provider } = ctx.state;
    console.log(profile, accessToken, provider);
    console.log(ctx.query);
    // ctx.redirect(decodeURI(redirectUrl.concat(next)));
    const user = await findUserByMailAndProvider(profile.email, provider);
    if (user) {
      // ctx.redirect(decodeURI(redirectUrl.concat(next)));
      return;
    }
    const registerTokenInfo = {
      profile,
      accessToken,
      provider,
    };
    const registerToken = await generateToken(registerTokenInfo, {
      expiresIn: '1h',
    });

    // set register token to cookie
    ctx.cookies.set('register_token', registerToken, {
      maxAge: 1000 * 60 * 60,
    });
    ctx.redirect(decodeURI('http://localhost:3000/register?social=true'));
  } catch (e) {
    ctx.throw('Internal Error', 500);
  }
};

export const socialRegister = async (ctx: Context) => {
  const registerToken = ctx.cookies.get('register_token');
  if (!registerToken) {
    ctx.status = 401;
    return;
  }
  const schema = Joi.object({
    username: Joi.string().min(1).max(45).required(),
    userId: Joi.string()
      .regex(/^[a-z0-9-_]+$/)
      .min(3)
      .max(16)
      .required(),
    about: Joi.string().allow('').max(140),
  });
  const { error } = schema.validate(ctx.request.body);
  if (error) {
    ctx.body = {
      success: false,
      msg: error.details.map(el => el.message).join(','),
    };
    return;
  }
  type RequestBody = {
    userId: string;
    username: string;
    about: string;
  };
  const { userId, username, about } = ctx.request.body as RequestBody;
  console.log(userId, username, about);
  // 1. 중복확인
  const exist = await checkDuplicateByuserId(userId);
  if (exist) {
    ctx.status = 409;
    ctx.body = {
      msg: '중복된 아이디입니다.',
    };
    return;
  }
  let decoded: SocialRegisterToken | null = null;
  try {
    decoded = await decodeToken<SocialRegisterToken>(registerToken);
  } catch (e) {
    ctx.status = 401;
    return;
  }
  const uuid = await registerUser(
    { userId, username, email: decoded.profile.email, about, thumbnail: decoded.profile.thumbnail },
    decoded.provider,
  );
  const tokens = await generateUserToken(uuid);
  setTokenCookie(ctx, tokens);
  ctx.body = {
    userId,
    username,
    about,
    email: decoded.profile.email,
    thumbnail: decoded.profile.thumbnail,
    tokens: {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    },
  };
};

export const socialRedirect = (ctx: Context) => {
  const { provider } = ctx.params;
  const { next } = ctx.query as { next: string };
  const validated = ['google', 'github'].includes(provider);
  if (!validated) {
    ctx.status = 400;
    return;
  }
  const loginUrl = generateSocialLoginLink(provider, {
    next,
  });
  ctx.redirect(loginUrl);
};

export const getSocialProfile = async (ctx: Context) => {
  const registerToken = ctx.cookies.get('register_token');
  if (!registerToken) {
    ctx.status = 401;
    return;
  }
  try {
    const decoded = await decodeToken(registerToken);
    ctx.body = decoded.profile;
  } catch (e) {
    ctx.status = 400;
    return;
  }
};
