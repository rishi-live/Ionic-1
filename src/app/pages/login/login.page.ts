import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginData = {
    email: '',
    password: ''
  }

  constructor(private router: Router, private authService: AuthService, private storageService: StorageService) { }

  ngOnInit() {
  }
  validateInputs() {
    let email = this.loginData.email.trim();
    let password = this.loginData.password.trim();

    return (
      this.loginData.email &&
      this.loginData.password &&
      email.length > 0 &&
      password.length > 0
    );
  }
  loginAction(loginData: any) {
    if (this.validateInputs()) {

      this.authService.login(this.loginData).subscribe(
        (res: any) => {
          if (res.userData) {
            // Storing the User data.
            console.log(res.userData);

          } else {
            console.log('Incorrect username and password.');
          }
        },
        (error: any) => {
          console.log('Network Issue.');
        }
      );
    }
    else {
      console.log("empty");

    }



    // console.log(this.loginData);
    // this.router.navigate(['./home/feed']); 
  }
}
