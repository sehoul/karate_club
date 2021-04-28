import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { InstructeurComponent } from './instructeur/instructeur.component';
import { AddFormComponent as FormP } from './president/add-form/add-form.component';
import { PresidentComponent } from './president/president.component';
import { AddFormComponent as FormS} from './secretaire/add-form/add-form.component';
import { SecretaireComponent } from './secretaire/secretaire.component';

const routes: Routes = [

  {path:'', component:HomepageComponent},
  {path:'p', component:PresidentComponent,
    children:[
      {path:'a',component:FormP},
    ]
  },
  {path:'s', component:SecretaireComponent,
  children:[
    {path:'a',component:FormS},
  ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
