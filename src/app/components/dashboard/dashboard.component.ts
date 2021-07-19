import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PassService } from 'src/app/services/pass.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  response: any;
  selected: any;
  selectAdhaar: any;
  selectPan: any;
  selectMob: any;
  myUhidCred: any;
  birthDate: any;
  tempDate: any;

  credentials = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    uhid: '',
  };

  constructor(
    private userService: UserService,
    private passService: PassService,
    public datepipe: DatePipe
  ) {
    this.datepipe.transform(this.credentials.dateOfBirth, 'dd-MM-yyyy');
  }

  ngOnInit(): void {
    this.selected = 'adhaar';
    this.selectAdhaar = 'adhaar';
    this.selectMob = 'mobile';
    this.selectPan = 'panNumber';
    if (this.passService.getUhid() != null) {
      console.log('dssh1', this.passService.getUhid());
      this.credentials.uhid = this.passService.getUhid();
      this.passService.clearData();
    }
  }

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
    if (this.birthDate != null) {
      this.tempDate = this.datepipe.transform(this.birthDate, 'dd-MM-yyyy');
      this.credentials.dateOfBirth = this.tempDate;
      console.log(this.credentials.dateOfBirth);
    }

    this.userService.createPatient(this.credentials).subscribe(
      (patient) => {
        console.log(patient);

        // this.user = user;
        this.response = 'Patient Registered Successfully';
      },
      (error) => {
        console.log(error);

        this.response = 'Invalid Credential or ID alreday exists';
      }
    );
    // console.log(this.birthDate);
  }
}
