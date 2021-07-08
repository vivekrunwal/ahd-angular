import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  credentials={
    name:'',
    emailOrMobile:'',
    role:'',
    enabled:true,
    password:'',
  }

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // console.log("Form is submitted");

    if (
      this.credentials.name != '' &&
      this.credentials.emailOrMobile != '' &&
      this.credentials.role != '' &&
      this.credentials.password != '' &&
      this.credentials.name != null &&
      this.credentials.emailOrMobile != null&&
      this.credentials.role != null&&
      this.credentials.password != null
    ) {
      // token generate

      console.log('We have to submit the form to server');

      this.loginService.generateRegisterToken(this.credentials).subscribe(
        (response: any) => {
          // success
          console.log(response.token);
          this.loginService.loginUser(response.token);
          window.location.href = '/dashboard';
        },
        (error) => {
          // error
          console.log(error);
        }
      );
    } else {
      console.log('Fields are empty');
    }
  }

}
