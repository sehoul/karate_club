import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFormComponent } from './add-form/add-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddFormComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PresidentModule { }
