import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnseignantRoutingModule } from './enseignant-routing.module';
import { ListEnseignantComponent } from './list-enseignant/list-enseignant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjoutEnseignantComponent } from './ajout-enseignant/ajout-enseignant.component';
import { EditEnseignantComponent } from './edit-enseignant/edit-enseignant.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [AjoutEnseignantComponent, EditEnseignantComponent, ListEnseignantComponent],
  imports: [
    CommonModule,
    EnseignantRoutingModule,
    FormsModule,  
    ReactiveFormsModule, 
    Ng2SearchPipeModule
  ]
})
export class EnseignantModule { }
