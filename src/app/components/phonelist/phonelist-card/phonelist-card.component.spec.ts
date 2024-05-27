import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonelistCardComponent } from './phonelist-card.component';

describe('PhonelistCardComponent', () => {
  let component: PhonelistCardComponent;
  let fixture: ComponentFixture<PhonelistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhonelistCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhonelistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
