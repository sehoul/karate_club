import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { InstructeurComponent } from './instructeur.component';



@NgModule({
  declarations: [
    CalendrierComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class InstructeurModule { }
