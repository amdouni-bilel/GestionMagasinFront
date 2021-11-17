import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSalleComponent } from './list-salle/list-salle.component';

const routes: Routes = [
  { path:'all', component:ListSalleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalleRoutingModule { }
