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
import { TdbComponent } from './tdb/tdb.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { EmploidutempsComponent } from './emploidutemps/emploidutemps.component';
import { AddemploidutempsComponent } from './addemploidutemps/addemploidutemps.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AdminsComponent } from './admins/admins.component';
import { AddadminComponent } from './addadmin/addadmin.component';



@NgModule({
  declarations: [
    AddFormComponent,
    AddActiviteComponent,
    AddgroupeComponent,
    MembresComponent,
    GroupesComponent,
    ActivitesComponent,
    TdbComponent,
    EmploidutempsComponent,
    AddemploidutempsComponent,
    AdminsComponent,
    AddadminComponent
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
   MatSelectModule,
   MatPaginatorModule,
   RouterModule,
   FullCalendarModule
  ]
})
export class SecretaireModule { }
