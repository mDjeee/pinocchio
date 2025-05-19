import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateBranch } from '../../shared/interfaces/branch.interface';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }


  getBranch(id: number, companyId: number) {
    const url = `${this.apiUrl}/api/v1/branch/${id}?companyId=${companyId}`;

    return this.http.get(url);
  }

  createBranch(payload: CreateBranch) {
    const url = `${this.apiUrl}/api/v1/branch/add`;

    return this.http.post(url, payload);
  }

  updateBranch(id: number, payload: CreateBranch) {
    const url = `${this.apiUrl}/api/v1/branch/edit/${id}`;

    return this.http.put(url, payload);
  }

  getBranches(companyId: number) {
    const url = `${this.apiUrl}/api/v1/branch/all/${companyId}`;

    return this.http.get(url);
  }

  deleteBranch(id: number) {
    const url = `${this.apiUrl}/api/v1/branch/delete/${id}`;

    return this.http.delete(url);
  }
}
