
export interface Organization {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  created_at: Date;
  updated_at: Date;
}

export interface ChiefAccounters {
  id: number;
  persistId: number;
  firstName: string;
  surname: string;
  patronymic: string;
  firstNameInter: string;
  surnameInter: string;
  patronymicInter: string;
  gender: string; // "1" likely represents male, but kept as string since it's coded
  citizenship: string; // Country code as string
  birthDate: string; // Format: "DD.MM.YYYY"
  birthRegion: string; // Region code as string
  birthDistrict: string; // District code as string
  birthAddress: string;
  residenceRegion: string; // Region code as string
  residenceDistrict: string; // District code as string
  residenceAddress: string;
  docType: string; // Document type code as string
  docSerial: string;
  docNumber: string;
  docIssueDate: string; // Format: "DD.MM.YYYY"
  docExpireDate: string; // Format: "DD.MM.YYYY"
  docIssuePlace: string;
  docMrz: string; // "0" likely represents false/not available
  birthCountry: string; // Country code as string
  residenceCountry: string; // Country code as string
}

export interface OrganizationDetail {
  clientCode?: string;
  inn: string;
  filialCode: string;
  address: string;
  directorName: string;
  directorPassport: string;
  name: string;
  registrationPlaceCode: string;
  registrationDate: string; // or Date if you'll convert it
  registrationDocumentNumber: string;
  codeJuridicalPerson: string;
  mobilePhone: string;
  nameHeaderOrganization?: string;
  mainAccount: string;
  clientUid: string;
  chiefAccounters: ChiefAccounters[];
}

export interface CreateCompany {
  name: string;
  phone: string;
  address: string;
  email: string;
}
