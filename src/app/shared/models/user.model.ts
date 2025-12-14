export type Role = 'USER' | 'ADMIN';

export interface User {
  id?: string;
  name?: string;
  gender?: string;
  age?: number;
  email: string;
  password: string;
  role?: Role;
}
