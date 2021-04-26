import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructeurComponent } from './instructeur.component';

describe('InstructeurComponent', () => {
  let component: InstructeurComponent;
  let fixture: ComponentFixture<InstructeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
