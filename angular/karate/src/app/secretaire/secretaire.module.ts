import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFormComponent } from './add-form/add-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddActiviteComponent } from './add-activite/add-activite.component';
import { AddgroupeComponent } from './addgroupe/addgroupe.component';
import { MembresComponent } from './membres/membres.component';
import { GroupesComponent } from './groupes/groupes.component';
import { ActivitesComponent } from './activites/activites.component';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';



@NgModule({
  declarations: [
    AddFormComponent,
    AddActiviteComponent,
    AddgroupeComponent,
    MembresComponent,
    GroupesComponent,
    ActivitesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
   MatTableExporterModule,
   MatPaginatorModule
  ]
})
export class SecretaireModule { }
