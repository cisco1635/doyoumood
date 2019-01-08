// material.module.ts

import { NgModule } from '@angular/core';
import { MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule   } from '@angular/material';
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
    MatMomentDateModule 
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
    BrowserAnimationsModule,
    MatMomentDateModule 
  ],
  providers: [ MatDatepickerModule ],
})

export class MaterialModule {}