
export interface Tariff {
  id: number;
  name: string,
  price: number,
  description: string,
  isActive: boolean,
  periodMonth: number
}

export interface CreateTariff {
  name: string,
  price: number,
  description: string,
  isActive: boolean,
  periodMonth: number
}
