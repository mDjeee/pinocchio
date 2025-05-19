
export interface Branch {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  companyId: number;
}

export interface CreateBranch {
  name: string;
  address: string;
  phoneNumber: string;
  companyId: number;
}
