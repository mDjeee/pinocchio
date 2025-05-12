import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from '../../shared/interfaces/user.interface';
import { Admin, CreateAdmin } from '../../shared/interfaces/admin.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  getAdmins() {
    const url = `${this.apiUrl}/api/admin/admin`;
    return this.http.get(url);
  }

  createAdmin(payload: CreateAdmin) {
    const url = `${this.apiUrl}/api/admin/admin`;
    return this.http.post(url, payload);
  }

  getAdminById(id: number): Observable<Admin> {
    const url = `${this.apiUrl}/api/admin/admin/${id}`;
    return this.http.get<Admin>(url);
  }

  updateAdmin(id: number, payload: CreateAdmin) {
    const url = `${this.apiUrl}/api/admin/admin/${id}`;
    return this.http.patch(url, payload);
  }

  deleteAdmin(id: number) {
    const url = `${this.apiUrl}/api/admin/admin/${id}`;
    return this.http.delete(url);
  }
}
