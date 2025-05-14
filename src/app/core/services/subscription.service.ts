import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateSubscribeCompany, CreateSubscribeUser } from '../../shared/interfaces/subscribe.interface';

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
}
