import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InstructeurModule } from './instructeur/instructeur.module';
import {PresidentComponent} from './president/president.component';
import { PresidentModule } from './president/president.module';

import {SecretaireComponent} from './secretaire/secretaire.component';
import { SecretaireModule } from './secretaire/secretaire.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstructeurComponent } from './instructeur/instructeur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyTableComponent } from './my-table/my-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AuthComponent } from './auth/auth.component';
import { CookieService } from 'ngx-cookie-service';
import { LogoutComponent } from './logout/logout.component';
import { AuthSecretaireGuard } from './guards/auth-secretaire.guard';
import { AuthPresidentGuard } from './guards/auth-president.guard';
import { AuthInstructeurGuard } from './guards/auth-instructeur.guard';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './Services/network.interceptor';
<<<<<<< HEAD
import { ExcelComponent } from './excel/excel.component';
=======
import { MatSelectModule } from '@angular/material/select';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FullCalendarModule } from '@fullcalendar/angular';
registerLocaleData(localeFr);

>>>>>>> 3f5a74a0034484be63e61c8f33cdaa6e6d3e8a4b
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PresidentComponent,
    SecretaireComponent,
    InstructeurComponent,
    MyTableComponent,
    AuthComponent,
    LogoutComponent,
    ExcelComponent,

  ],
  imports: [
    BrowserModule,
    InstructeurModule,
    PresidentModule,
    SecretaireModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableExporterModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FullCalendarModule

  ],
  providers: [CookieService,AuthSecretaireGuard,AuthPresidentGuard,AuthInstructeurGuard, { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },{provide: LOCALE_ID, useValue: "fr-CA" } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
