import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: AuthenticationService,
    private loadingController: LoadingController,
    private toastr: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      mobile: ['', [Validators.required], Validators.minLength(10), Validators.maxLength(12)],
      email: ['', [Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'), Validators.minLength(1)])]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    });
    this.reset();
  }
  get foo() { return this.registerForm.controls; }

  reset() {
    (<HTMLInputElement>document.getElementById("fname")).value = "";
    (<HTMLInputElement>document.getElementById("lname")).value = "";
    (<HTMLInputElement>document.getElementById("email")).value = "";
    (<HTMLInputElement>document.getElementById("mobile")).value = "";
    (<HTMLInputElement>document.getElementById("password")).value = "";
  }

  async signupAction(fg: FormGroup) {
    let fname = fg.value.fname;
    let lname = fg.value.lname;
    let mobile = fg.value.mobile.toString();
    let email = fg.value.email;
    let password = fg.value.password;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      const alert = await this.toastr.create({
        header: "Sign Up Fail",
        message: "Please enter username and password...!!",
        buttons: ["OK"]
      });
      await alert.present();
    } else {
      // console.log(email)
      // console.log(password)

      const loading = await this.loadingController.create();
      await loading.present();

      var FromData = {};

      FromData["first_name"] = fname;
      FromData["last_name"] = lname;
      FromData["mobile"] = mobile;
      FromData["email"] = email;
      FromData["password"] = password;

      this.service.createUser(FromData).subscribe(async (data: any) => {
        
        if (data.status == 201) {
          await loading.dismiss();
          const alert = await this.toastr.create({
            header: "Sign Up",
            message: data.message,
            buttons: ["OK"]
          });
          await alert.present();
          this.router.navigate(['/login']);

          this.reset();
        } else {
          const alert = await this.toastr.create({
            header: "Sign Up Fail",
            message: data.message,
            buttons: ["OK"]
          });
          await loading.dismiss();
          await alert.present();
          this.router.navigate(['/signup']);

        }
      }, async (err) => {
        const alert = await this.toastr.create({
          header: "Sign Up Fail",
          message: err.error.body.message,
          buttons: ["OK"]
        });
        await loading.dismiss();
        await alert.present();
        this.router.navigateByUrl('/signup');
      })
    }
  }

}
