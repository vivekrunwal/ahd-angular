import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  error: any;
  progress: any;
  isMobile: any;
  isEmail: any;
  isValid: any;
  sendOtpResponse: any;
  verifyOtpResponse: any;

  sendOtpEmail = {
    email: '',
  };
  sendOtpMobile = {
    phoneNo: '',
  };
  verifyOtp = {
    otp: '',
    cred: '',
  };

  credentials = {
    name: '',
    emailOrMobile: '',
    role: '',
    enabled: true,
    password: '',
  };

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.progress = 0;
    this.isValid = false;
    this.verifyOtpResponse = 'Verify OTP';
    this.sendOtpResponse = 'Send OTP';
  }

  verifyOtpbtn() {
    if (this.verifyOtp.otp != null && this.verifyOtp.otp != '') {
      if (this.isMobile == true) {
        console.log('start mobile');
        this.loginService.verifyMobile(this.verifyOtp).subscribe(
          (res) => {
            if (res == true) {
              // openDialog();
              console.log('mobile otp verified');
              this.isValid = true;
              this.verifyOtpResponse = 'OTP Verified';
            } else {
              console.log('Error');
              this.isValid = false;
              this.verifyOtpResponse = 'OTP Invalid';
            }
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
      }
      if (this.isEmail == true) {
        console.log('start email');

        this.loginService.verifyEmail(this.verifyOtp).subscribe(
          (res) => {
            if (res) {
              // openDialog();
              console.log('email otp verified');
              this.verifyOtpResponse = 'OTP Verified';
              this.isValid = true;
            } else {
              console.log('Error');
              this.verifyOtpResponse = 'OTP Invalid';
              this.isValid = false;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
      console.log(this.verifyOtp);
    } else {
      console.log('Empty Credentials');
    }
  }

  sendOtp() {
    // console.log(this.credentials.emailOrMobile.indexOf('@'));

    if (this.credentials.emailOrMobile.indexOf('@') == -1) {
      this.sendOtpMobile.phoneNo = '+91' + this.credentials.emailOrMobile;
      this.isMobile = true;
      this.verifyOtp.cred = this.sendOtpMobile.phoneNo;
      this.loginService.otpMobile(this.sendOtpMobile).subscribe(
        (res) => {
          if (res) {
            // openDialog();
            console.log('otp send');
            this.sendOtpResponse = 'Otp sent successfully';
          } else {
            console.log('Error');
            this.sendOtpResponse = 'Otp Invalid';
          }
        },
        (error) => {
          console.log(error);
        }
      );
      // console.log('this is phone');
    } else {
      this.sendOtpEmail.email = this.credentials.emailOrMobile;
      this.verifyOtp.cred = this.sendOtpEmail.email;
      this.isEmail = true;
      this.loginService.otpEmail(this.sendOtpEmail).subscribe(
        (res) => {
          if (res) {
            console.log('otp send');
            this.sendOtpResponse = 'Otp sent successfully';
          } else {
            console.log('Error');
            this.sendOtpResponse = 'Invalid';
          }
        },
        (error) => {
          console.log(error);
        }
      );
      // console.log('this is email');
    }
  }

  onSubmit() {
    // console.log("Form is submitted");

    if (!this.isValid) {
      console.log('Verify your Email or Mobile No.');
      return;
    }

    this.progress = 50;
    console.log(this.credentials);

    if (
      this.credentials.name != '' &&
      this.credentials.emailOrMobile != '' &&
      this.credentials.role != '' &&
      this.credentials.password != '' &&
      this.credentials.name != null &&
      this.credentials.emailOrMobile != null &&
      this.credentials.role != null &&
      this.credentials.password != null
    ) {
      // token generate

      console.log('We have to submit the form to server');

      this.loginService.generateRegisterToken(this.credentials).subscribe(
        (response: any) => {
          // success
          console.log(response.token);
          this.loginService.loginUser(response.token);
          this.progress = 100;
          this.error = 'Successfully Registered';
          window.location.href = '/searchNew';
        },
        (error) => {
          this.progress = 0;
          // error
          console.log(error);
          this.error = 'User already Registered';
        }
      );
    } else {
      this.error = 'Field are empty';
      console.log('Fields are empty');
    }
  }
}
