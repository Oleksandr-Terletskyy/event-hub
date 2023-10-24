export interface IUsers {
  accounts: IUser[];
  total: number;
}

export interface IUser {
  sessionKey: string;
  username: string;
  name: string;
}
export interface IUserAuthResponse {
  id: number;
  username: string;
  name: string;
}
