import { RoleEnum } from './role.interface';

export interface LoginResponse {
userResponse: {
  id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: RoleEnum
};
token: string;
  companyUserResponse: {
  userInfo: {
    id: number;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      role: RoleEnum
  };
  company: {
    id: number;
      name: string;
      email: string;
      address: string;
      phoneNumber: string
  };
  role: {
    id: number;
      name: string;
      type: RoleEnum
  };
    status: string;
  };
  windows: string[],
}
