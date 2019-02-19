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

import { MaterialModule } from './material.module';

const routes: Routes = [
  {
    path: 'vote',
    component: VoteComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/vote',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    ReportComponent,
    LoginComponent
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
