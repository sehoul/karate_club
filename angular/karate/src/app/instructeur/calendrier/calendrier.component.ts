import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';
import { CookieService } from 'ngx-cookie-service';
import { EmploidutempsService } from 'src/app/Services/emploidutemps.service';

interface ev{
  title: string, 
  start:string,
  end:string,
  color:string
}

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {

  temps:Array<ev>=[]
  calendarOptions: CalendarOptions | undefined 
 
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }
  
  color=['#264653','#7209b7','#d00000','#81b29a','#6b705c'];

  constructor(private emploisService:EmploidutempsService,private cookie:CookieService) { }

  ngOnInit(): void {
    this.emploisService.getCrenauInstructeur(Number(this.cookie.get('idInst'))).subscribe((res:any)=>{
      res.forEach((element:any) => {
        this.temps.push( 
          {title:element.event +" ("+ element.instructeur.nom +") group : ("+element.groupe.nomGroupe+")",
          start:element.start,
          end:element.end,
          color:this.color[Math.floor(Math.random() * this.color.length)]
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
