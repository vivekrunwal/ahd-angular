import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch:'full' },
  { path: 'login', component: LoginComponent, pathMatch:'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch:'full', canActivate: [AuthGuard] },
  { path: 'register', component: SignupComponent, pathMatch:'full' },
 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }