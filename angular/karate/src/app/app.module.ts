import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InstructeurComponent } from './instructeur/instructeur.component';
import { InstructeurModule } from './instructeur/instructeur.module';
import { PresidentComponent } from './president/president.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    InstructeurComponent,
    PresidentComponent
  ],
  imports: [
    BrowserModule,
    InstructeurModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
