
export interface Admin {
  id: number;
  full_name: string;
  phone: string;
  password: string;
  email: string;
}


export interface CreateAdmin {
  full_name: string;
  phone: string;
  password: string;
  email: string;
}
