import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-emploidutemps',
  templateUrl: './emploidutemps.component.html',
  styleUrls: ['./emploidutemps.component.css']
})
export class EmploidutempsComponent implements OnInit {

  temps=[{ title: 'event 123', date: '2021-05-18' },
  { title: 'event 7584', date: '2021-05-19' }]
  calendarOptions: CalendarOptions = {
    locales: [frLocale ],
    locale: 'fr',
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
