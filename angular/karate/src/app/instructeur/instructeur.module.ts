import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { InstructeurComponent } from './instructeur.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { TdbComponent } from './tdb/tdb.component';
import { MembresComponent } from './membres/membres.component';
import { GroupesComponent } from './groupes/groupes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    CalendrierComponent,
    TdbComponent,
    MembresComponent,
    GroupesComponent
  
    
   
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableExporterModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    RouterModule  
  ]
})
export class InstructeurModule { }
