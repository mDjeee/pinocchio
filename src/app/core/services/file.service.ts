import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) {
  }

  uploadImg(file: File): Observable<any> {
    const token: any = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post('https://corp-file.aab.uz/api/file-upload/v1/admin/document', formData, {
      headers: {
        'X-Auth-Token': token
      }
    });
  }

  uploadFile(file: File): Observable<any> {
    const token: any = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post('https://corp-file.aab.uz/api/file-upload/v1/admin/document', formData, {
      headers: {
        'X-Auth-Token': token
      }
    });
  }
}
