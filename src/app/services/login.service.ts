import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:8079/user';
  baseUrl = 'http://localhost:8079';

  constructor(private http: HttpClient) {}

  generateToken(credentials: any) {
    return this.http.post(`${this.url}/token`, credentials);
  }

  generateRegisterToken(credentials: any) {
    return this.http.post(`${this.url}/register`, credentials);
  }

  loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');

    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    return true;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  otpMobile(SMSPojo: any) {
    return this.http.post(`${this.baseUrl}/user/otp/mobile`, SMSPojo);
  }

  otpEmail(emailPojo: any) {
    return this.http.post(`${this.baseUrl}/user/otp/email`, emailPojo);
  }

  verifyMobile(otpCred: any) {
    return this.http.post(`${this.baseUrl}/user/otp/verifyMobile`, otpCred);
  }

  verifyEmail(otpCred: any) {
    return this.http.post(`${this.baseUrl}/user/otp/verifyEmail`, otpCred);
  }
}
