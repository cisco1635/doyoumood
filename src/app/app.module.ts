import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { VoteComponent } from './component/vote/vote.component';
import { ReportComponent } from './component/report/report.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UsersComponent } from './component/users/users.component';
import { TeamsComponent } from './component/teams/teams.component';
import { TeamComponent } from './component/team/team.component';
import { AuthGuardService } from './service/auth-guard.service';
import { MaterialModule } from './material.module';
import { UserComponent } from './component/user/user.component';

const routes: Routes = [
  {
    path: 'vote',
    component: VoteComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardService],
    data: { 
      expectedRole: 'admin'
    } 
  },
  {
    path: 'teams',
    component: TeamsComponent,
    canActivate: [AuthGuardService],
    data: { 
      expectedRole: 'admin'
    } 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    ReportComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UsersComponent,
    TeamsComponent,
    TeamComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
