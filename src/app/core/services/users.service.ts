import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateUser, User } from '../../shared/interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Organization } from '../../shared/interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  getUsers() {
    const url = `${this.apiUrl}/api/v1/user/all`;
    return this.http.get(url);
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.apiUrl}/api/v1/user/${id}`;
    return this.http.get<User>(url);
  }

  getCompanyUsers(id: number) {
    const url = `${this.apiUrl}/api/admin/users/by-org/${id}`;
    return this.http.get(url);
  }

  getUserOrganizations(id: number): Observable<Organization[]> {
    const url = `${this.apiUrl}/api/admin/users/org-by-user/${id}`;
    return this.http.get<Organization[]>(url);
  }

  createUser(payload: CreateUser) {
    const url = `${this.apiUrl}/api/v1/user/add`;
    return this.http.post(url, payload);
  }

  updateUser(id: number, payload: CreateUser) {
    const url = `${this.apiUrl}/api/v1/user/edit/${id}`;
    return this.http.patch(url, payload);
  }

  deleteUser(id: number) {
    const url = `${this.apiUrl}/api/v1/user/delete/${id}`;
    return this.http.delete(url);
  }

  detachUser(payload: { user_id: number, organization_id: number }) {
    const url = `${this.apiUrl}/api/admin/users/org/detach`;
    return this.http.post(url, payload);
  }
}
