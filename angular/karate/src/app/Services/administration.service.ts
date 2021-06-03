import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  private url= 'http://localhost:8000/admin/';


  constructor(private http: HttpClient) { }

  register(id:number,data:any){
    return this.http.post(this.url+"register/"+id,data);
  }
  getAdmins(){
    return this.http.get(this.url+"Admins");
  }
  deleteAdmin(idUser:number,id:number){
    return this.http.get(this.url+"admin/delete/"+idUser+"/"+id);
  }

  updateAdmin(id:number,data:any){
    return this.http.post(this.url+"update/"+id,data);
  }

}
