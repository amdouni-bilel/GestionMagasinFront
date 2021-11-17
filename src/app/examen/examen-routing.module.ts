import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListExamenComponent } from './list-examen/list-examen.component';
import { AjoutExamenComponent } from './ajout-examen/ajout-examen.component';
import { EditExamenComponent } from './edit-examen/edit-examen.component';

const routes: Routes = [
  { path:'add', component:AjoutExamenComponent},
  { path:'edit/:id', component:EditExamenComponent},
  { path:'all', component:ListExamenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamenRoutingModule { }
