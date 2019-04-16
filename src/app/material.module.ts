// material.module.ts

import { NgModule } from '@angular/core';
import { MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSnackBarModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatMomentDateModule,
    MatSnackBarModule,
    MatListModule
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  providers: [ MatDatepickerModule ],
})

export class MaterialModule {}