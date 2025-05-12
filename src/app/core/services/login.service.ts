import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  loginUser(data: {phoneNumber: string, password: string}) {
    const url = `${this.apiUrl}/api/v1/auth/login`;
    return this.http.post(url, data);
  }
}
