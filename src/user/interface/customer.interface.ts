import { User } from '../user.entity';

export interface UserInfo {
  username: string;
  password: string;
}

export type UserTokenInfo = Pick<User, 'id' | 'username' | 'role'>;
