import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { SalleRoutingModule } from './salle-routing.module';
import { ListSalleComponent } from './list-salle/list-salle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ListSalleComponent],
  imports: [
    CommonModule,
    SalleRoutingModule, 
    FormsModule,  
    ReactiveFormsModule,
    NgbModule
  ]
})
export class SalleModule { }
