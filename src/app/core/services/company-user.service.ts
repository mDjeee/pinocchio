import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AttachCompanyUser, CreateCompanyUser } from '../../shared/interfaces/company-user.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyUserService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  getCompanyUsers(companyId: number, isClients = false) {
    const url = `${this.apiUrl}/api/v1/company-user/${companyId}?isClients=${isClients}`;
    return this.http.get(url);
  }

  addCompanyUser(payload: CreateCompanyUser) {
    const url = `${this.apiUrl}/api/v1/company-user/add/company-user`;
    return this.http.post(url, payload);
  }

  getCompanyUserById(companyId: number) {
    const url = `${this.apiUrl}/api/v1/company-user/${companyId}`;
    return this.http.get(url);
  }

  attachUser(payload: AttachCompanyUser) {
    const url = `${this.apiUrl}/api/v1/company-user/attach-user`;
    return this.http.post(url, payload);
  }
}
