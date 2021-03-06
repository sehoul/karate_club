import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFormComponent } from './add-form/add-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddActiviteComponent } from './add-activite/add-activite.component';
import { AddgroupeComponent } from './addgroupe/addgroupe.component';
import { HttpClientModule } from '@angular/common/http';
import { MembresComponent } from './membres/membres.component';
import { ActivitesComponent } from './activites/activites.component';
import { GroupesComponent } from './groupes/groupes.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { TdbComponent } from './tdb/tdb.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminsComponent } from './admins/admins.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { MatSelectModule } from '@angular/material/select';
import { EmploidutempsComponent } from './emploidutemps/emploidutemps.component';
import { AddemploidutempsComponent } from './addemploidutemps/addemploidutemps.component';
import { CalendrierComponent } from '../instructeur/calendrier/calendrier.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { GroupesmembresComponent } from './groupesmembres/groupesmembres.component';
import { MatSortModule } from '@angular/material/sort';
import { SaisonsComponent } from './saisons/saisons.component';




@NgModule({
  declarations: [
    AddFormComponent,
    AddActiviteComponent,
    AddgroupeComponent,
    MembresComponent,
    ActivitesComponent,
    GroupesComponent,
    TdbComponent,
    AdminsComponent,
    AddadminComponent,
    EmploidutempsComponent,
    AddemploidutempsComponent,
    GroupesmembresComponent,
    SaisonsComponent

  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatTableExporterModule,
    MatPaginatorModule,
    MatSelectModule,
    FullCalendarModule,
    MatSortModule,

   
  ]
})
export class PresidentModule { }
