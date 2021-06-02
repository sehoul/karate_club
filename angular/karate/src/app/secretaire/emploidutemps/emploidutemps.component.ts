import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';
import {DatePipe, formatDate} from '@angular/common';
import { EmploidutempsService } from 'src/app/Services/emploidutemps.service';

interface ev{
  title: string,
  start:string,
  end:string
}

@Component({
  selector: 'app-emploidutemps',
  templateUrl: './emploidutemps.component.html',
  styleUrls: ['./emploidutemps.component.css']
})
export class EmploidutempsComponent implements OnInit {

  temps:Array<ev>=[]
  calendarOptions:CalendarOptions | undefined 
 
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }

  constructor(private emploisService:EmploidutempsService) { }

  ngOnInit(): void {
    this.emploisService.getCrenau().subscribe((res:any)=>{
      res.forEach((element:any) => {
        this.temps.push( 
          {title:element.event +" ("+ element.instructeur.nom +") group : ("+element.groupe.nomGroupe+")",
          start:element.start,
          end:element.end
         }
         );
      }); 
      this.calendarOptions= {
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
        events: this.temps,
        eventClick: function(info) {
          var eventObj = info.event;
          if((new DatePipe('fr-FR')).transform(eventObj.end,'M/d/yy hh:mm'))
            alert(eventObj.title +" de "+ (new DatePipe('fr-FR')).transform(eventObj.start,'M/d/yy hh:mm')  + " à " + (new DatePipe('fr-FR')).transform(eventObj.end,'M/d/yy hh:mm') );
          else
          alert(eventObj.title +" de "+ (new DatePipe('fr-FR')).transform(eventObj.start,'M/d/yy hh:mm')  + " à " + (new DatePipe('fr-FR')).transform(eventObj.start,'M/d/yy hh:mm') );
    
        }
      };
     },error=>{
 
     });
  }
}
