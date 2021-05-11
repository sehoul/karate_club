import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';

import { InstructeurComponent } from './instructeur/instructeur.component';
import { MyTableComponent } from './my-table/my-table.component';

import { AddActiviteComponent as FormAcP} from './president/add-activite/add-activite.component';
import { AddFormComponent as FormP } from './president/add-form/add-form.component';
import { AddgroupeComponent as FormGP} from './president/addgroupe/addgroupe.component';
import { MembresComponent } from './president/membres/membres.component';
import { PresidentComponent } from './president/president.component';

import { AddActiviteComponent as FormAcS } from './secretaire/add-activite/add-activite.component';
import { AddFormComponent as FormS} from './secretaire/add-form/add-form.component';
import { AddgroupeComponent as FormGS} from './secretaire/addgroupe/addgroupe.component';
import { SecretaireComponent } from './secretaire/secretaire.component';

const routes: Routes = [

  {path:'', component:HomepageComponent},
  {path:'i', component:InstructeurComponent},
  {path:'t', component:MyTableComponent},
  {path:'p', component:PresidentComponent,
    children:[
      {path:'membres',component:MembresComponent},
      {path:'ajout-membre',component:FormP},
      {path:'ajout-activitee',component:FormAcP},
      {path:'ajout-groupe',component:FormGP}
    ]
  },
  {path:'s', component:SecretaireComponent,
  children:[
    {path:'a',component:FormS},
    {path:'ac',component:FormAcS},
    {path:'ag',component:FormGS}
  ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
