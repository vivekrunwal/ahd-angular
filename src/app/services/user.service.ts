import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:8079';

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(`${this.baseUrl}/user/getusers`);
  }

  getUhid(adhaar: any) {
    return this.http.get(`${this.baseUrl}/patients/${adhaar}`, {
      responseType: 'text',
    });
  }

  createPatient(patient: any) {
    return this.http.post(`${this.baseUrl}/patients`, patient);
  }

  searchPatient(uhid: any) {
    return this.http.get(`${this.baseUrl}/patients/uhid/${uhid}`);
  }

  createEpisode(episode: any) {
    return this.http.post(`${this.baseUrl}/visit/episode`, episode);
  }

  createEncounter(uhid: any, encounter: any) {
    return this.http.post(`${this.baseUrl}/visit/encounter/${uhid}`, encounter);
  }
}
