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


  submit() {

    const data={
      nomactivite:this.form.getRawValue().nomactivite,
      Cotisation:this.form.getRawValue().Cotisation,
    }


    console.log(data.nomactivite);

  }


  ngOnInit(): void {
  }
}
