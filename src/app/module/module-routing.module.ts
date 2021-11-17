import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListModuleComponent } from './list-module/list-module.component';
import {AjoutModuleComponent} from "./ajout-module/ajout-module.component";
import {EditModuleComponent} from "./edit-module/edit-module.component";

const routes: Routes = [
  { path:'all', component:ListModuleComponent},
  { path:'add', component:AjoutModuleComponent},
  { path:'edit/:id', component:EditModuleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
