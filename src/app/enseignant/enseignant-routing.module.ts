import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEnseignantComponent } from './list-enseignant/list-enseignant.component';
import { AjoutEnseignantComponent } from './ajout-enseignant/ajout-enseignant.component';
import { EditEnseignantComponent } from './edit-enseignant/edit-enseignant.component';

const routes: Routes = [
  { path:'add', component:AjoutEnseignantComponent},
  { path:'edit/:id', component:EditEnseignantComponent},
  { path:'all', component:ListEnseignantComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantRoutingModule { }
