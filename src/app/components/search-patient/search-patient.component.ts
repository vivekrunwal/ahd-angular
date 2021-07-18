import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.css'],
})
export class SearchPatientComponent implements OnInit {
  uhid: any;
  response: any;
  dataSource: any;
  displayedColumns: string[] = ['key', 'value'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  public orderByKey(a: any, b: any) {
    return a.key;
  }

  getPatient() {
    if (this.uhid != '' && this.uhid != null) {
      this.userService.searchPatient(this.uhid).subscribe(
        (patient) => {
          console.log(patient);
          this.dataSource = patient;
          // console.log(myuhid);
          // this.user = user;
        },
        (error) => {
          // console.log(this.credentials.aadharNumber);
          this.response = "Patient doesn't exist. Kindle Create New One";
          window.location.href = '/dashboard';
          console.log(error);
        }
      );
    } else {
      this.response = 'Invalid UHID';
    }
  }
}
