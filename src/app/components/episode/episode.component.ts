import { Component, OnInit } from '@angular/core';
import { PassService } from 'src/app/services/pass.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css'],
})
export class EpisodeComponent implements OnInit {
  response: any;

  credentials = {
    encounterType: '',
    encounterTypeDescription: '',
    encounterReason: '',
    visit: {
      episodeType: '',
      uhid: '',
    },
  };

  constructor(
    private userService: UserService,
    private passService: PassService
  ) {}

  ngOnInit(): void {
    if (this.passService.getUhid() != null) {
      console.log('dssh1', this.passService.getUhid());
      this.credentials.visit.uhid = this.passService.getUhid();
      this.passService.clearData();
    }
  }

  onSubmit() {
    console.log('clicked');
    console.log(this.credentials);

    this.userService.createEpisode(this.credentials).subscribe(
      (episode) => {
        console.log(episode);

        // this.user = user;
        this.response = 'Episode Created Successfully';
      },
      (error) => {
        console.log(error);
        this.response = 'Invalid Credentials';
      }
    );
  }
}
