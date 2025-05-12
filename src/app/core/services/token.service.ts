import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private jwtHelper = new JwtHelperService();

  constructor() { }

  // Parse the token from the authentication response
  parseTokenResponse(data: any): {
    token: string,
    tokenType: string,
    expiresIn: number,
    refreshExpiresIn: number
  } {
    if (!data?.token) {
      throw new Error('Invalid token response');
    }

    return {
      token: data.token,
      tokenType: data.token_type,
      expiresIn: data.expires_in,
      refreshExpiresIn: data.refresh_expires_in
    };
  }

  // Decode the JWT token to get payload
  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  // Get token expiration date
  getTokenExpirationDate(token: string): Date | null {
    return this.jwtHelper.getTokenExpirationDate(token);
  }

  // Check if token is expired
  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  // Get token claims
  getTokenClaims(token: string): any {
    const decoded = this.decodeToken(token);
    return decoded || null;
  }

  // Get user ID from token
  getUserId(token: string): string | null {
    const claims = this.getTokenClaims(token);
    return claims?.sub || null;
  }

  getFullName(token: string): string | null {
    const claims = this.getTokenClaims(token);
    return claims?.full_name || null;
  }

  getEmail(token: string): string | null {
    const claims = this.getTokenClaims(token);
    return claims?.email || null;
  }

  // Get token issued at time
  getTokenIssuedAt(token: string): Date | null {
    const claims = this.getTokenClaims(token);
    return claims?.iat ? new Date(claims.iat * 1000) : null;
  }
}
