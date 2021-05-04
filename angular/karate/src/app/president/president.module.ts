import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFormComponent } from './add-form/add-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddActiviteComponent } from './add-activite/add-activite.component';
import { AddgroupeComponent } from './addgroupe/addgroupe.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AddFormComponent,
    AddActiviteComponent,
    AddgroupeComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PresidentModule { }
