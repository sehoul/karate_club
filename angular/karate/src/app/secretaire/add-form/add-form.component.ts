import { Component} from '@angular/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {

  ListMembres=[
    {id: 1 , categorie: 'A' , genre:'H' , grade: '2' },
 ];

  log(x:any) {console.log(x);}


  submit(f:any) {
    console.log(f);}

}
