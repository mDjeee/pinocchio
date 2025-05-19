import { RoleEnum } from './role.interface';

export interface CreateSubscribeCompany {
  companyId: number;
  tariffId: number;
}

export interface CreateSubscribeUser {
  companyId: number;
  tariffId: number;
  userId: number;
  branchId: number;
}

export interface SubscriptionsFilter {
  dateFrom: string;
  dateTo: string;
}

export interface SubscriptionsFilterCompany {
  dateFrom: string;
  dateTo: string;
  companyId: number;
  userId: number;
}

export interface Subscriptions {
  companyId: number,
  tariff: {
    id: number,
    name: string,
    price: number,
    description: string,
    isActive: boolean,
    periodMonth: number
  },
  isActive: true,
  userResponse: {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    role: RoleEnum
  },
  expiredAt: string;
}
