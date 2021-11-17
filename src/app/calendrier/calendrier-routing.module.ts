import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PClasseComponent } from '../calendrier/pclasse/pclasse.component';
import { PEnseignantComponent } from '../calendrier/penseignant/penseignant.component';
import { PSalleComponent } from '../calendrier/psalle/psalle.component';

const routes: Routes = [
  { path:'enseignant', component:PEnseignantComponent},
  { path:'classe', component:PClasseComponent},
  { path:'salle', component:PSalleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendrierRoutingModule { }
