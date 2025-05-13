import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTariff, Tariff } from '../../shared/interfaces/tariff.interface';

@Injectable({
  providedIn: 'root'
})
export class TariffService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  getTariffs() {
    const url = `${this.apiUrl}/api/v1/tariff/all`;
    return this.http.get(url);
  }

  getTariffById(id: string): Observable<Tariff> {
    const url = `${this.apiUrl}/api/v1/tariff/${id}`;
    return this.http.get<Tariff>(url);
  }

  createTariff(tariff: CreateTariff): Observable<Tariff> {
    const url = `${this.apiUrl}/api/v1/tariff/add`;
    return this.http.post<Tariff>(url, tariff);
  }

  updateTariff(id: string, tariff: Tariff): Observable<Tariff> {
    const url = `${this.apiUrl}/api/v1/tariff/edit/${id}`;
    return this.http.put<Tariff>(url, tariff);
  }

  deleteTariff(id: number): Observable<void> {
    const url = `${this.apiUrl}/api/v1/tariff/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
