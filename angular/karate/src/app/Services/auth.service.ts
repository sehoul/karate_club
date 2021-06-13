import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookie:CookieService) { }

  getUser(data:any){
    return this.http.post<any>('http://localhost:8000/connexion',data);
  }



  // pour la secraitaire
  private _isSecretaire:boolean=JSON.parse(this.cookie.get('isSecretaireLogged') || 'false');
  get IsSecretaireLogedIn(){
    return JSON.parse(this.cookie.get('isSecretaireLogged') || this._isSecretaire.toString());
  }
  setSecretaireLogedIn(value:boolean,id:string){
    this._isSecretaire=value;
    this.cookie.set('isSecretaireLogged', 'true');
    this.cookie.set('idSec', id);
  }


  // pour le president
  private _isPresident:boolean=JSON.parse(this.cookie.get('isPresidentLogged') || 'false');
  get IsPresidentLogedIn(){
    return JSON.parse(this.cookie.get('isPresidentLogged') || this._isPresident.toString());
  }
  setPresidentLogedIn(value:boolean,id:string){
    this._isPresident=value;
    this.cookie.set('isPresidentLogged', 'true');
    this.cookie.set('idPres', id);
  }

  // pour l'instructeur
  private _isInstructeur:boolean=JSON.parse(this.cookie.get('isInstructeurLogged') || 'false');
  get IsInstructeurLogedIn(){
    return JSON.parse(this.cookie.get('isInstructeurLogged') || this._isInstructeur.toString());
  }
  setInstructeurLogedIn(value:boolean,id:string){
    this._isInstructeur=value;
    this.cookie.set('isInstructeurLogged', 'true');
    this.cookie.set('idInst', id);
  }

}
