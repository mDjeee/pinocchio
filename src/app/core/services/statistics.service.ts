import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getStatistics(companyId: number, filter: StatisticsFilter) {
    const url = `${this.apiUrl}/api/v1/company-user/get-company-users/statistics/${companyId}`;

    const params = new HttpParams()
      .set('dateFrom', filter.dateFrom)
      .set('dateTo', filter.dateTo)
      .set('isDaily', filter.isDaily) // Enum будет автоматически сериализован в строку
      .set('byBranch', filter.byBranch.toString());

    return this.http.get(url, { params });
  }
}
