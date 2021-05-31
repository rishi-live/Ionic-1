import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public redirectUrl: string;
  getHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token
      })
    }
  };
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  // checking is logged in
  get isLoggedIn() {
    // return this.loggedInStatus;
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  userLogin(data) {
    return this.http.post(environment.appConfig.apiUrl + 'user/login/', data);
  }
  createUser(data) {
    return this.http.post(environment.appConfig.apiUrl + 'user/signUp/', data);
  }
  logout() {
    localStorage.clear();
  }
}
