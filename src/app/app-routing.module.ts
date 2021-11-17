import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ModuleModule } from './module/module.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { ExamenModule } from './examen/examen.module';
import { CalendrierModule } from './calendrier/calendrier.module';
import { SalleModule } from './salle/salle.module';
import { EnseignantModule } from './enseignant/enseignant.module';
import { ClientModule} from "./client/client.module";


import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path:'login', component:LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path:'home', component:HomeComponent, canActivate:[AuthGuard],
      children: [
        { path: 'examen', loadChildren: './examen/examen.module#ExamenModule'},
        { path: 'etudiant', loadChildren: './etudiant/etudiant.module#EtudiantModule'},
        { path: 'module', loadChildren: './module/module.module#ModuleModule'} ,
        { path: 'calendrier', loadChildren: './calendrier/calendrier.module#CalendrierModule'} ,
        { path: 'salle', loadChildren: './salle/salle.module#SalleModule'} ,
        { path: 'enseignant', loadChildren: './enseignant/enseignant.module#EnseignantModule'} ,
/*
        { path: 'client', loadChildren: './client/client.module#ClientModule'}
*/
        {path: 'client' , loadChildren: './client/client.module#ClientModule'}



      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
