import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtudiantRoutingModule } from './etudiant-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjoutEtudiantComponent } from './ajout-etudiant/ajout-etudiant.component';
import { EditEtudiantComponent } from './edit-etudiant/edit-etudiant.component';
import { ListEtudiantComponent } from './list-etudiant/list-etudiant.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
 


@NgModule({
  declarations: [ListEtudiantComponent, AjoutEtudiantComponent, EditEtudiantComponent],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    Ng2SearchPipeModule
  ]
})
export class EtudiantModule { }
