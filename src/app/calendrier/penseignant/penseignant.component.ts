import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-penseignant',
  templateUrl: './penseignant.component.html',
  styleUrls: ['./penseignant.component.css']
})
export class PEnseignantComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listWeek'
    },
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      { title: 'Examen 1', date: '2020-11-18'},
      { title: 'Examen 2', date: '2020-11-19'},
      { title: 'Examen 3', date: '2020-11-20'},
      { title: 'Examen 4', date: '2020-11-21'},
      { title: 'Examen 5', date: '2020-11-22'},
      { title: 'Examen 6', date: '2020-11-23'},
      { title: 'Examen 7', date: '2020-11-24'} 
    ]
  };


}
