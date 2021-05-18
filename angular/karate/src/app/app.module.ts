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
   
  ],
  providers: [CookieService,AuthSecretaireGuard,AuthPresidentGuard,AuthInstructeurGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
