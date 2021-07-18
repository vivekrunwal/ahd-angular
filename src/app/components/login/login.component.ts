import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: any;
  progress: number = 0;

  credentials = {
    username: '',
    password: '',
  };
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.progress = 0;
  }

  onSubmit() {
    // console.log("Form is submitted");
    this.progress = 50;

    if (
      this.credentials.username != '' &&
      this.credentials.password != '' &&
      this.credentials.username != null &&
      this.credentials.password != null
    ) {
      // token generate

      console.log('We have to submit the form to server');

      this.loginService.generateToken(this.credentials).subscribe(
        (response: any) => {
          // success
          console.log(response.token);
          this.loginService.loginUser(response.token);
          this.progress = 100;
          window.location.href = '/searchNew';
        },
        (error) => {
          // error
          this.progress = 0;
          this.error = 'Bad Credentials';
          console.log(error);
        }
      );
    } else {
      console.log('Fields are empty');
    }
  }
}
