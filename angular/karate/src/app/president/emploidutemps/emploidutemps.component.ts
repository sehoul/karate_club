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
  selector: 'app-emploidutemps',
  templateUrl: './emploidutemps.component.html',
  styleUrls: ['./emploidutemps.component.css']
})
export class EmploidutempsComponent implements OnInit {

  temps:Array<ev>=[]
  calendarOptions: CalendarOptions | undefined 
 
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }
  
  color=['#264653','#7209b7','#d00000','#81b29a','#6b705c'];

  constructor(private emploisService:EmploidutempsService,private cookie:CookieService) { }

  _error:string="";
  setError(error:string){
    this._error=error;
  }
  ngOnInit(): void {
    let emp=this.emploisService;
    let err=this.setError;
    let cookie=this.cookie;
    this.emploisService.getCrenau().subscribe((res:any)=>{
      res.forEach((element:any) => {
        this.temps.push( 
          {title:element.event +" \""+ element.instructeur.nom +"\" group : \""+element.groupe.nomGroupe+"\"" +"#"+element.id ,
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
            {
            if(confirm(eventObj.title.split("#", 2)[0] +" de "+ (new DatePipe('fr-FR')).transform(eventObj.start,'M/d/yy hh:mm')  + " à " + (new DatePipe('fr-FR')).transform(eventObj.end,'M/d/yy hh:mm') + "\nSi vous voulez supprimer ce crenau cliquez \"OK\"")){
              emp.deleteCrenau(Number(eventObj.title.split("#", 2)[1]),Number(cookie.get('idPres'))).subscribe((res:any)=>{ 
                window.location.reload();                
              },error=>{
                err(error.error.message);
              })
            }
          }
          else
          if(confirm(eventObj.title.split("#", 2)[0] +" de "+ (new DatePipe('fr-FR')).transform(eventObj.start,'M/d/yy hh:mm')  + " à " + (new DatePipe('fr-FR')).transform(eventObj.start,'M/d/yy hh:mm') + "\nSi vous voulez supprimer ce crenau cliquez \"OK\"")){
            emp.deleteCrenau(Number(eventObj.title.split("#", 2)[1]),Number(cookie.get('idPres'))).subscribe((res:any)=>{       
              window.location.reload();
            },error=>{
              err(error.error.message);
            })
          }   
        }
      };
     },error=>{

      

     });
  }
  errorAlert(){
    this._error="";
  }
}
