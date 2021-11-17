import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEtudiantComponent } from './list-etudiant/list-etudiant.component';
import { AjoutEtudiantComponent } from './ajout-etudiant/ajout-etudiant.component';
import { EditEtudiantComponent } from './edit-etudiant/edit-etudiant.component';

const routes: Routes = [
  { path:'add', component:AjoutEtudiantComponent},
  { path:'edit/:id', component:EditEtudiantComponent},
  { path:'all', component:ListEtudiantComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
