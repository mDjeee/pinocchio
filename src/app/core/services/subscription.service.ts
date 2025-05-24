import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CreateSubscribeCompany,
  CreateSubscribeUser,
  SubscriptionsFilter, SubscriptionsFilterCompany
} from '../../shared/interfaces/subscribe.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  subscribeCompany(payload: CreateSubscribeCompany) {
    const url = `${this.apiUrl}/api/v1/subscribe`;
    return this.http.post(url, payload);
  }

  subscribeUser(payload: CreateSubscribeUser) {
    const url = `${this.apiUrl}/api/v1/subscribe/company`;
    return this.http.post(url, payload);
  }

  getSubscriptions(filter: SubscriptionsFilter) {
    const url = `${this.apiUrl}/api/v1/subscribe/history`;

    const params = new HttpParams()
      .set('dateFrom', filter.dateFrom)
      .set('dateTo', filter.dateTo)

    return this.http.get(url, { params });
  }

  getSubscriptionsCompany(filter: SubscriptionsFilterCompany) {
    const url = `${this.apiUrl}/api/v1/subscribe/company/history`;

    const params = new HttpParams()
      .set('dateFrom', filter.dateFrom)
      .set('dateTo', filter.dateTo)
      .set('companyId', filter.companyId)

    if(filter.userId) {
      params.set('userId', filter.userId);
    }

    return this.http.get(url, { params });
  }


}
