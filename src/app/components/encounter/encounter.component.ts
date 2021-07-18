import { Component, OnInit } from '@angular/core';
import { PassService } from 'src/app/services/pass.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css'],
})
export class EncounterComponent implements OnInit {
  response: any;
  uhid: any;

  credentials = {
    encounterType: '',
    encounterTypeDescription: '',
    encounterReason: '',
  };

  constructor(
    private userService: UserService,
    private passService: PassService
  ) {}

  ngOnInit(): void {
    if (this.passService.getUhid() != null) {
      console.log('dssh1', this.passService.getUhid());
      this.uhid = this.passService.getUhid();
      this.passService.clearData();
    }
  }

  onSubmit() {
    console.log('clicked');
    console.log(this.credentials);

    this.userService.createEncounter(this.uhid, this.credentials).subscribe(
      (episode) => {
        console.log(episode);
        // this.user = user;
        this.response = 'Encounter Created Successfully';
      },
      (error) => {
        console.log(error);
        this.response = 'Invalid Credentials';
      }
    );
  }
}
