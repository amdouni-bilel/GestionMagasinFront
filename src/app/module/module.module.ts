import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleRoutingModule } from './module-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AjoutModuleComponent} from "./ajout-module/ajout-module.component";
import {EditModuleComponent} from "./edit-module/edit-module.component";
import { ListModuleComponent } from './list-module/list-module.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [ListModuleComponent , AjoutModuleComponent , EditModuleComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    Ng2SearchPipeModule 
  ]
})
export class ModuleModule { }
