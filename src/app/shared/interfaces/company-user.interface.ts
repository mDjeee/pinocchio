import { RoleEnum } from './role.interface';

export interface CreateCompanyUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyId: number;
  roleEnum: RoleEnum;
  status: string;
}

export interface CompanyUser {
  userInfo: {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    role: RoleEnum
  },
  company: {
    id: number,
    name: string,
    email: string,
    address: string,
    phoneNumber: string
  },
  role: {
    id: number,
    name: string,
    type: RoleEnum,
  },
  status: string,
}
