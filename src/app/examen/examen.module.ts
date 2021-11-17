import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamenRoutingModule } from './examen-routing.module';
import { ListExamenComponent } from './list-examen/list-examen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjoutExamenComponent } from './ajout-examen/ajout-examen.component';
import { EditExamenComponent } from './edit-examen/edit-examen.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [ListExamenComponent, AjoutExamenComponent, EditExamenComponent],
  imports: [
    CommonModule,
    ExamenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ]
})
export class ExamenModule { }
