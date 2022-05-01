import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSuccesComponent } from './login-succes.component';

describe('LoginSuccesComponent', () => {
  let component: LoginSuccesComponent;
  let fixture: ComponentFixture<LoginSuccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSuccesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
