import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTariff, Tariff } from '../../shared/interfaces/tariff.interface';
import { CompanyTariff, CreateCompanyTariff } from '../../shared/interfaces/company-tariff.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyTariffService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  getTariffs() {
    const url = `${this.apiUrl}/api/v1/company-tariff/all`;
    return this.http.get(url);
  }

  getTariffById(id: string): Observable<CompanyTariff> {
    const url = `${this.apiUrl}/api/v1/company-tariff/${id}`;
    return this.http.get<CompanyTariff>(url);
  }

  createTariff(tariff: CreateCompanyTariff): Observable<CompanyTariff> {
    const url = `${this.apiUrl}/api/v1/company-tariff/add`;
    return this.http.post<CompanyTariff>(url, tariff);
  }

  updateTariff(id: string, tariff: CreateCompanyTariff): Observable<CompanyTariff> {
    const url = `${this.apiUrl}/api/v1/company-tariff/edit/${id}`;
    return this.http.put<CompanyTariff>(url, tariff);
  }

  deleteTariff(id: number): Observable<void> {
    const url = `${this.apiUrl}/api/v1/company-tariff/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
