

export interface CompanyClientStatisticsRequest {
  companyId: number;
  dateFrom: string;
  dateTo: string;
}


export interface CompanyClientStatistics {
  amount: number;
  newUserCount: number;
}

export enum DateTypeEnum {
  YEARLY = 'YEARLY',
  MONTHY = 'MONTHLY',
  DAILY = 'DAILY'
}

export interface StatisticsFilter {
  companyId: number;
  dateFrom: string;
  dateTo: string;
  isDaily: DateTypeEnum;
  byBranch: boolean;
}

export interface Statistics {
  companyId: number;
  date: string;
  allUserCount: number;
  allAmount: number;
  newMembers: number;
  activeMembers: number;
  churnCount: number,
  branchName: string;
  amount: number;
}

export interface CompanyStatistics {
  [companyName: string]: Statistics[];
}
