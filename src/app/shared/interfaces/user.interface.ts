export interface User {
  id: number;
  full_name: string,
  phone: number;
  org_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface CreateUser {
  full_name: string;
  phone: string;
  org_ids: number[];
  password: string;
}
