import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { SearchPatientComponent } from './components/search-patient/search-patient.component';
import { SearchNewComponent } from './components/search-new/search-new.component';
import { EpisodeComponent } from './components/episode/episode.component';
import { EncounterComponent } from './components/encounter/encounter.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  { path: 'register', component: SignupComponent, pathMatch: 'full' },
  {
    path: 'searchPatient',
    component: SearchPatientComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'searchNew',
    component: SearchNewComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'episode',
    component: EpisodeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'encounter',
    component: EncounterComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
