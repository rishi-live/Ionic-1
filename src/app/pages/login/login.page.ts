import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // public loginData = {
  //   email: '',
  //   password: ''
  // }
  loginForm: FormGroup;
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthenticationService,) { }
  // constructor(private router: Router, private authService: AuthService, private storageService: StorageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password
    });
  }

  loginAction() {
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;

    var FromData = {};

    FromData["email"] = email;
    FromData["password"] = password;

    this.authService.userLogin(FromData).subscribe((data: any) => {
      console.log(data)
      if (data) {
        if (data.body.status = false) {
          // this.showDanger('Please enter the valid username and password');
          alert(data.body.message)
          this.router.navigateByUrl('/login');
        } else {
          // this.showSuccess('You are Sucessfully login!');
          localStorage.setItem('currentUser', JSON.stringify(data.body));
          this.authService.setLoggedIn(true);
          if (this.authService.redirectUrl) {
            this.router.navigate([this.authService.redirectUrl]);
            this.authService.redirectUrl = null;
          } else {
            this.router.navigate(['./home/feed'])
          }
        }
      } else {
        this.router.navigateByUrl('/login');
        alert("Something is worng")
      }

    })
  }
  // loginAction(loginData: any) {
  //   if (this.validateInputs()) {
  //     this.authService.login(this.loginData).subscribe(
  //       (res: any) => {
  //         if (res.userData) {
  //           // Storing the User data.
  //           console.log(res.userData);
  //         } else {
  //           console.log('Incorrect username and password.');
  //         }
  //       },
  //       (error: any) => {
  //         console.log('Network Issue.');
  //       }
  //     );
  //   }
  //   else {
  //     console.log("empty");
  //   }
  //       // console.log(this.loginData);
  //   // this.router.navigate(['./home/feed']); 
  // }
}
