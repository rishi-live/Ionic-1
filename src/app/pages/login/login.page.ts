import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthenticationService,) { }

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
        if (data.body.status != 200) {
          // this.showDanger('Please enter the valid username and password');
          alert(data.message)
          this.router.navigateByUrl('/login');
        } else {
          // this.showSuccess('You are Sucessfully login!');
          localStorage.setItem('currentUser', JSON.stringify(data.body));
          this.authService.setLoggedIn(true);

          this.router.navigate(['./home/feed']);
        }
      } else {
        this.router.navigateByUrl('/login');
        alert("Something is worng")
      }

    })
  }

}
