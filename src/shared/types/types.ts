export type TFlight = {
  id: string;
  code: string;
  date: string;
  capacity: number;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
};

export type TAuth = {
  user: TUser;
  accessToken: string;
};
