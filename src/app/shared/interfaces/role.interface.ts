export enum RoleEnum {
  OWNER = 'OWNER',
  SHAREHOLDER = 'SHAREHOLDER',
  DIRECTOR = 'DIRECTOR',
  CUSTOM = 'CUSTOM',
  ADMIN = 'ADMIN',
}

export enum CompanyRoleEnum {
  DIRECTOR = 'DIRECTOR',
  CUSTOM = 'CUSTOM',
  ADMIN = 'ADMIN',
}

export interface Role {
  id: number;
  name: string;
  type: RoleEnum;
}

export interface CreateRole {
  name: string;
  type: RoleEnum;
}

