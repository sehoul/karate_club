import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFormComponent } from './add-form/add-form.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AddFormComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class PresidentModule { }
