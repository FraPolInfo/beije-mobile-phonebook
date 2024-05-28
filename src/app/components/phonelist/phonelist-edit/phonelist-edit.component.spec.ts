import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonelistEditComponent } from './phonelist-edit.component';

describe('PhonelistEditComponent', () => {
  let component: PhonelistEditComponent;
  let fixture: ComponentFixture<PhonelistEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhonelistEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhonelistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
