import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmembreactivitesComponent } from './addmembreactivites.component';

describe('AddmembreactivitesComponent', () => {
  let component: AddmembreactivitesComponent;
  let fixture: ComponentFixture<AddmembreactivitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmembreactivitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmembreactivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
