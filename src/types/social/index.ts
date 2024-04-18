export type SocialProvider = 'github' | 'google';
export type SocialProfile = {
  uid: number | string;
  thumbnail: string | null;
  email: string;
  name: string;
  username?: string;
};

export type SocialRegisterToken = {
  profile: SocialProfile;
  provider: SocialProvider;
  accessToken: string;
};
