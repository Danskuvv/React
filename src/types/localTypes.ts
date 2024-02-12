import { User } from '../types/DBTypes';
type Credentials = Pick<User, 'username' | 'password'>;
export type { Credentials };
