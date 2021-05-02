import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder  ,FormControl , Validators } from '@angular/forms';
import { Activite } from '../../activite.model';


@Component({
  selector: 'app-add-activite',
  templateUrl: './add-activite.component.html',
  styleUrls: ['./add-activite.component.css']
})
export class AddActiviteComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form=this.fb.group({
      nomactivite:  new FormControl('', [Validators.required]),
      Cotisation:new FormControl('', [Validators.required])    });


  }


  get nomactivite() : any {   return this.form.get('nomactivite');}
  get Cotisation() : any { return this.form.get('Cotisation');}



  private activite:Array<Activite>=[
    new Activite(1,'karaté',100)
  ]


  submit() {

    console.log(this.form.getRawValue());
    const data=this.form.getRawValue();
    this.activite.push(new Activite(2,data.nomactivite,data.Cotisation));
    console.log(this.activite);

  }


  ngOnInit(): void {
  }
}
