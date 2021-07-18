import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassService } from 'src/app/services/pass.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-new',
  templateUrl: './search-new.component.html',
  styleUrls: ['./search-new.component.css'],
})
export class SearchNewComponent implements OnInit {
  aadharNumber: any;
  panNumber: any;
  mobileNumber: any;
  selected: any;
  selectAdhaar: any;
  selectPan: any;
  selectMob: any;
  uhid: any;
  uhidCred: any;
  response: any;

  constructor(
    private userService: UserService,
    private passService: PassService,
    private router: Router
  ) {
    this.selected = 'adhaar';
    this.selectAdhaar = 'adhaar';
    this.selectMob = 'mobile';
    this.selectPan = 'panNumber';
  }

  ngOnInit(): void {}

  getUhid() {
    console.log(this.selected);

    switch (this.selected) {
      case 'adhaar':
        this.uhidCred = this.aadharNumber;
        break;
      case 'panNumber':
        this.uhidCred = this.panNumber;
        break;
      case 'mobile':
        this.uhidCred = this.mobileNumber;
        break;
    }

    console.log(this.uhidCred);

    if (this.uhidCred != '' && this.uhidCred != null) {
      this.userService.getUhid(this.uhidCred).subscribe(
        (myuhid) => {
          // console.log(this.uhid);
          // console.log(myuhid);
          this.response = '';

          this.uhid = myuhid;
          return myuhid;
          // this.user = user;
        },
        (error) => {
          // console.log(this.credentials.aadharNumber);
          this.response = 'Invalid Credential';
          console.log(error);
        }
      );
    } else {
      this.response = 'Invalid Credential';
    }
  }

  addPatient() {
    console.log(this.uhid);
    this.passService.setUhid(this.uhid);
    // window.location.href = '/dashboard';
    this.router.navigateByUrl('/dashboard');
    // console.log(this.passService.getUhid());
  }
}
