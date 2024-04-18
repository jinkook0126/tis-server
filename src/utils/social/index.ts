import { SocialProvider } from '@/types/social';
import { google } from 'googleapis';

const { GITHUB_ID, GOOGLE_CLIENT_ID, GOOGLE_SECRET, API_HOST } = process.env;

const redirectPath = `/auth/social/`;
export const redirectUri =
  process.env.NODE_ENV === 'development' ? `http://${API_HOST}${redirectPath}` : `https://${API_HOST}${redirectPath}`;

type Options = {
  next: string;
};

const generators = {
  github({ next }: Options) {
    const redirectUriWithOptions = `${redirectUri}github?next=${next}`;
    return `https://github.com/login/oauth/authorize?scope=user:email&client_id=${GITHUB_ID}&redirect_uri=${redirectUriWithOptions}`;
  },
  google({ next }: Options) {
    const callback = `${redirectUri}google`;
    const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_SECRET, callback);
    const url = oauth2Client.generateAuthUrl({
      scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
      state: JSON.stringify({ next }),
    });
    return url;
  },
};

export function generateSocialLoginLink(provider: SocialProvider, { next = '/' }: Options) {
  const generator = generators[provider];
  return generator({
    next: encodeURI(next),
  });
}
