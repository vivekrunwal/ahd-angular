import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PassService {
  constructor() {}

  passUhid: any;

  setUhid(passUhid: any) {
    console.log('Pass', passUhid);

    this.passUhid = passUhid;
  }

  getUhid() {
    const temp = this.passUhid;
    // this.passUhid = undefined;
    // this.clearData();
    return temp;
  }

  clearData() {
    this.passUhid = undefined;
  }
}
