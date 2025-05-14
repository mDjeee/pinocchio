import { RoleEnum } from './role.interface';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: RoleEnum,
  updated_at: Date;
  created_at: Date;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: RoleEnum,
  password: string;
}
