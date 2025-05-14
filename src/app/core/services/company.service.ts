import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateCompany, OrganizationDetail } from '../../shared/interfaces/company.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  getCompanies() {

    const url = `${this.apiUrl}/api/v1/company/all`;

    return this.http.get(url);
  }

  getCompanyById(id: number) {
    const url = `${this.apiUrl}/api/v1/company/${id}`;
    return this.http.get(url);
  }

  createCompany(payload: CreateCompany) {
    const url = `${this.apiUrl}/api/v1/company/add`;
    return this.http.post(url, payload);
  }

  updateCompany(id: number, payload: CreateCompany) {
    const url = `${this.apiUrl}/api/v1/company/edit/${id}`;
    return this.http.put(url, payload);
  }

  deleteCompany(id: number) {
    const url = `${this.apiUrl}/api/v1/company/delete/${id}`;
    return this.http.delete(url);
  }

  getCompanyByInn(inn: string): Observable<OrganizationDetail> {
    const url = `${this.apiUrl}/api/admin/organization/info-by-tin?tin=${inn}`;
    return this.http.get<OrganizationDetail>(url);
  }
}
