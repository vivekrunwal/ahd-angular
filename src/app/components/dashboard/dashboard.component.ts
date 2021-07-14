import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  response: any;

  credentials = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    aadharNumber: '',
    panNumber: '',
    mobileNumber: '',
    uhid: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  getUser() {
    this.userService.getUser().subscribe(
      (user) => {
        console.log(user);

        this.user = user;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {

    this.userService.createPatient(this.credentials).subscribe(
      (patient) => {
        console.log(patient);
        
        // this.user = user;
        this.response = "Patient Created"
      },
      (error) => {
        console.log(error);
        this.response = "Patient with given uhid already exists"
      }
    );
    // console.log(this.credentials);
  }

  getUhid(){

    if(this.credentials.aadharNumber!=null && this.credentials.aadharNumber!=""){
    this.userService.getUhid(this.credentials.aadharNumber).subscribe(
      (myuhid) => {

        console.log(this.credentials.aadharNumber);
        console.log(myuhid);
        
        this.credentials.uhid = myuhid;
        // this.user = user;
      },
      (error) => {
        // console.log(this.credentials.aadharNumber);
        console.log(error);
      }
    );
  }
}

}
