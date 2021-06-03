import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    locales: [frLocale],
    locale: 'fr',
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2021-05-18', color: '#2a9d8f' },
      { title: 'event 2', date: '2021-05-19',color: '#0077b6' }
    ],
    
  };
 
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
