import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StatisticsFilter } from '../../shared/interfaces/statistics.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  getStatistics(companyId: number, payload: StatisticsFilter) {
    const url = `${this.apiUrl}/api/v1/company-user/get-company-users/statistics/${companyId}`;
    return this.http.post(url, payload);
  }
}
