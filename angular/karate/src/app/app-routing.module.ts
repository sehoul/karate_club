import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';

import { MyTableComponent } from './my-table/my-table.component';

import { InstructeurComponent } from './instructeur/instructeur.component';

import { AddActiviteComponent as FormAcP} from './president/add-activite/add-activite.component';
import { AddFormComponent as FormP } from './president/add-form/add-form.component';
import { AddgroupeComponent as FormGP} from './president/addgroupe/addgroupe.component';
import { MembresComponent, MembresComponent as PdtM} from './president/membres/membres.component';
import { PresidentComponent } from './president/president.component';
import { ActivitesComponent } from './president/activites/activites.component';
import { GroupesComponent } from './president/groupes/groupes.component';
import { TdbComponent, TdbComponent as TdbP } from './president/tdb/tdb.component';

import { AddActiviteComponent as FormAcS } from './secretaire/add-activite/add-activite.component';
import { AddFormComponent as FormS} from './secretaire/add-form/add-form.component';
import { AddgroupeComponent as FormGS} from './secretaire/addgroupe/addgroupe.component';
import { SecretaireComponent } from './secretaire/secretaire.component';
import { ActivitesComponent as ScrA }  from './secretaire/activites/activites.component';
import { MembresComponent as ScrM }  from './secretaire/membres/membres.component';
import { MembresComponent as InstM }  from './instructeur/membres/membres.component';
import { GroupesComponent as ScrG }  from './secretaire/groupes/groupes.component';
import { GroupesComponent as InstG }  from './instructeur/groupes/groupes.component';
import { TdbComponent as TdbS} from './secretaire/tdb/tdb.component';
import { TdbComponent as TdbI} from './instructeur/tdb/tdb.component';

import { AuthComponent } from './auth/auth.component';

import { LogoutComponent } from './logout/logout.component';

import { AuthSecretaireGuard } from './guards/auth-secretaire.guard';
import { AuthPresidentGuard } from './guards/auth-president.guard';
import { AuthInstructeurGuard } from './guards/auth-instructeur.guard';
import { CalendrierComponent } from './instructeur/calendrier/calendrier.component';
import { AdminsComponent } from './president/admins/admins.component';
import { AddadminComponent } from './president/addadmin/addadmin.component';
import { AdminsComponent as adminS } from './secretaire/admins/admins.component';
import { AddadminComponent as addAdminS} from './secretaire/addadmin/addadmin.component';
import { EmploidutempsComponent } from './president/emploidutemps/emploidutemps.component';
import { AddemploidutempsComponent } from './president/addemploidutemps/addemploidutemps.component';
import { EmploidutempsComponent as empS} from './secretaire/emploidutemps/emploidutemps.component';
import { AddemploidutempsComponent as addempS} from './secretaire/addemploidutemps/addemploidutemps.component';
import {  GroupesmembresComponent as grpmembreS } from './secretaire/groupesmembres/groupesmembres.component';
import {AddmembreactivitesComponent} from "./secretaire/addmembreactivites/addmembreactivites.component";
import { GroupesmembresComponent } from './president/groupesmembres/groupesmembres.component';
import { ExcelComponent } from './excel/excel.component';
import { ProfilComponent } from './instructeur/profil/profil.component';
import { SaisonsComponent } from './president/saisons/saisons.component';
import { SaisonsComponent as SaisonSec } from './secretaire/saisons/saisons.component';


const routes: Routes = [

  {path:'', component:HomepageComponent},
  {path:'excel', component:ExcelComponent},
  {path:'connexion', component:AuthComponent},
  {path:'logout', component:LogoutComponent},
  {path:'t', component:MyTableComponent},

  {path:'i', component:InstructeurComponent,
    canActivate: [AuthInstructeurGuard],
    children:[
      {path:'calendrier',component:CalendrierComponent},
      {path:'',component:TdbI},
      {path:'groupes',component:InstG},
      {path:'membres',component:InstM},
      {path:'profil',component:ProfilComponent},
    ]
  },

  {path:'p', component:PresidentComponent,
    canActivate: [AuthPresidentGuard],
    children:[
      {path:'',component:TdbP},
      {path:'membres',component:PdtM},
      {path:'ajouter-membre',component:FormP},
      {path:'ajouter-activitee',component:FormAcP},
      {path:'ajouter-groupe',component:FormGP},
      {path:'activitees',component:ActivitesComponent},
      {path:'groupes',component:GroupesComponent},
      {path:'comptes',component:AdminsComponent},
      {path:'ajouter-compte',component:AddadminComponent},
      {path:'emploidutemps',component:EmploidutempsComponent},
      {path:'ajouter-crenau',component:AddemploidutempsComponent},
      {path:'groupes-membres',component:GroupesmembresComponent},
      {path:'saisons',component:SaisonsComponent}

    ]
  },
  {path:'s', component:SecretaireComponent,
    canActivate: [AuthSecretaireGuard],
    children:[
      {path:'',component:TdbS},
      {path:'ajouter-membre',component:FormS},
      {path:'ajouter-activitee',component:FormAcS},
      {path:'ajouter-groupe',component:FormGS},
      {path:'membres',component:ScrM},
      {path:'activitees',component:ScrA},
      {path:'groupes',component:ScrG},
      {path:'emploidutemps',component:empS},
      {path:'ajouter-crenau',component:addempS},
      {path:'comptes',component:adminS},
      {path:'ajouter-compte',component:addAdminS},
      {path:'groupes-membres',component:grpmembreS},
      {path:'activites-membres',component:AddmembreactivitesComponent},
      {path:'saisons',component:SaisonSec}


    ]
  },


  {path:'**', redirectTo:'/',pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
