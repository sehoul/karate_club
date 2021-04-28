import { Component} from '@angular/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {


  log(x:any) {console.log(x);}


  submit(f:any) {
    console.log(f);}

}
