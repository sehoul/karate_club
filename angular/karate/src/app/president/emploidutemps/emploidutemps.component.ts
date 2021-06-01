import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-emploidutemps',
  templateUrl: './emploidutemps.component.html',
  styleUrls: ['./emploidutemps.component.css']
})
export class EmploidutempsComponent implements OnInit {

  temps=[
    { title: 'event 123', start: '2021-05-18',end: '2021-05-20' },
    { title: 'event 7584', start: '2021-05-18T16:24',end: '2021-05-18T20:24'}
  ]
  calendarOptions: CalendarOptions = {
    locales: [frLocale ],
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    themeSystem: 'bootstrap',
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.temps
  };
 
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }
  

  constructor() { }

  ngOnInit(): void {
  }


}
