import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }
}
