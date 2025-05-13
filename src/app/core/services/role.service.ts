import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateRole, Role } from '../../shared/interfaces/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  getRoles() {
    const url = `${this.apiUrl}/api/v1/role/all`;
    return this.http.get(url);
  }

  getRoleById(id: string): Observable<Role> {
    const url = `${this.apiUrl}/api/v1/role/${id}`;
    return this.http.get<Role>(url);
  }

  createRole(Role: CreateRole): Observable<Role> {
    const url = `${this.apiUrl}/api/v1/role/add`;
    return this.http.post<Role>(url, Role);
  }

  updateRole(id: string, Role: Role): Observable<Role> {
    const url = `${this.apiUrl}/api/v1/role/edit/${id}`;
    return this.http.put<Role>(url, Role);
  }

  deleteRole(id: number): Observable<void> {
    const url = `${this.apiUrl}/api/v1/role/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
