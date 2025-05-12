import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  tokenKey = 'auth_token';
  userKey = 'user';

  constructor() {
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


  // Remove token from storage
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if token exists
  hasToken(): boolean {
    return this.getToken() !== null;
  }

  setUserDetail(email: string, fullName: string) {
    const payload = { email, fullName };
    localStorage.setItem(this.userKey, JSON.stringify(payload));
  }

  getUserDetail() {
    const user = localStorage.getItem(this.userKey);
    if(user) return JSON.parse(user);
    return null;
  }

  removeUser() {
    localStorage.removeItem(this.userKey);
  }
}
