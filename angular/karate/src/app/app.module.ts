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
import { FormsModule } from '@angular/forms';
import { InstructeurComponent } from './instructeur/instructeur.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PresidentComponent,
    SecretaireComponent,
    InstructeurComponent
  ],
  imports: [
    BrowserModule,
    InstructeurModule,
    PresidentModule,
    SecretaireModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
