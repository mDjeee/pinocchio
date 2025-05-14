import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
}
