import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthConstant } from '../config/auth-constant';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // url = environment.apiUrl
  // constructor(private http: HttpClient, private storageService: StorageService
  // ) { }

  // login(loginData: any): Observable<any> {
  //   console.log(loginData);

  //   return this.http.post(`${this.url}/user/login`, loginData)
  // }
  // signup(postData: any): Observable<any> {
  //   console.log(postData);
  //   return this.http.post(`${this.url}/user/signup`, postData)
  // }
  // logout() {

  //   return this.storageService.clear();
  //   // this.storageService.removeItem(AuthConstant.AUTH).then(res => {
  //   //   this.router.navigate(['']);
  //   // })
  // }


};
// export class AuthService {

//   constructor(private httpService: HttpService,
//     private storageService: StorageService,
//     private router: Router) { }

//   login(loginData: any): Observable<any> {
//     return this.httpService.post('/user/login', loginData)
//   }
//   signup(postData: any): Observable<any> {
//     return this.httpService.post('/user/signup', postData)
//   }
//   logout() {

//     return this.storageService.clear();
//     // this.storageService.removeItem(AuthConstant.AUTH).then(res => {
//     //   this.router.navigate(['']);
//     // })
//   }


// };
