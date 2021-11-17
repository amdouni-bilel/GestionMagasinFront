import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendrierRoutingModule } from './calendrier-routing.module';
import { PSalleComponent } from './psalle/psalle.component';
import { PEnseignantComponent } from './penseignant/penseignant.component'; 
import { PClasseComponent } from './pclasse/pclasse.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import listPlugin from '@fullcalendar/list';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin,
  listPlugin
]);

@NgModule({
  declarations: [PSalleComponent, PEnseignantComponent, PClasseComponent],
  imports: [
    CommonModule,
    FullCalendarModule, 
    CalendrierRoutingModule
  ]
})
export class CalendrierModule { }
