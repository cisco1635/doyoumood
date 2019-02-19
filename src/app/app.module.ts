import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { VoteComponent } from './component/vote/vote.component';
import { ReportComponent } from './component/report/report.component';

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
    path: '',
    redirectTo: '/vote',
    pathMatch: 'full'
  }
];

const mongoose = require('mongodb');

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    ReportComponent
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
