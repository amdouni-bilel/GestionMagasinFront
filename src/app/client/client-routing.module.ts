import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListclientComponent} from "./listclient/listclient.component";
import {ListModuleComponent} from "../module/list-module/list-module.component";

const routes: Routes = [
  { path:'all', component:ListclientComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
