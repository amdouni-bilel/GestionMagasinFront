import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ClientRoutingModule } from './client-routing.module';
import { AjoutclientComponent } from './ajoutclient/ajoutclient.component';
import { EditclientComponent } from './editclient/editclient.component';
import { ListclientComponent } from './listclient/listclient.component';


@NgModule({
  declarations: [AjoutclientComponent, EditclientComponent, ListclientComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClientRoutingModule ,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ]
})
export class ClientModule { }
