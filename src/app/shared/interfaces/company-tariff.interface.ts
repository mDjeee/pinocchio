export interface CreateCompanyTariff {
  name: string,
  price: number,
  description: string,
  isActive: true,
  periodDays: number
}

export interface CompanyTariff {
  id: number;
  name: string,
  price: number,
  description: string,
  isActive: true,
  periodDays: number
}
