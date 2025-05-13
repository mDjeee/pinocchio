import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateClient, Client } from '../../shared/interfaces/Client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  getClients() {
    const url = `${this.apiUrl}/api/v1/client/all`;
    return this.http.get(url);
  }

  getClientById(id: string): Observable<Client> {
    const url = `${this.apiUrl}/api/v1/client/${id}`;
    return this.http.get<Client>(url);
  }

  createClient(Client: CreateClient): Observable<Client> {
    const url = `${this.apiUrl}/api/v1/client/add`;
    return this.http.post<Client>(url, Client);
  }

  updateClient(id: string, Client: Client): Observable<Client> {
    const url = `${this.apiUrl}/api/v1/client/edit/${id}`;
    return this.http.put<Client>(url, Client);
  }

  deleteClient(id: number): Observable<void> {
    const url = `${this.apiUrl}/api/v1/client/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
