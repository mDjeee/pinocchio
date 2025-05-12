export interface User {
  id: number;
  firstName: string,
  lastName: string,
  phoneNumber: string;
  email: string;
  updated_at: Date;
  created_at: Date;
}

export interface CreateUser {
  full_name: string;
  phone: string;
  org_ids: number[];
  password: string;
}
