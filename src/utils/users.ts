import { generateToken } from './token';

export const generateUserToken = async (id: string) => {
  const refreshToken = await generateToken(
    {
      user_id: id,
    },
    {
      subject: 'refresh_token',
      expiresIn: '30d',
    },
  );

  const accessToken = await generateToken(
    {
      user_id: id,
    },
    {
      subject: 'access_token',
      expiresIn: '1h',
    },
  );
  return {
    refreshToken,
    accessToken,
  };
};
