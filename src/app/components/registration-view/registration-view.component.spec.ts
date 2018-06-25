import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationViewComponent } from './registration-view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {API_PROVIDER, API_RESTDB_KEY, API_RESTDB_URL} from '../../app.config';
import {HttpClientModule} from '@angular/common/http';
import {ProgressbarModule} from 'ngx-bootstrap';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {DatePipe} from '@angular/common';

describe('RegistrationViewComponent', () => {
  let component: RegistrationViewComponent;
  let fixture: ComponentFixture<RegistrationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationViewComponent ],
      imports: [BrowserModule, HttpClientModule, RouterTestingModule, ProgressbarModule, FormsModule, ReactiveFormsModule],
      providers: [
        UserService,
        AuthService,
        DatePipe,
        {
          provide: API_PROVIDER,
          useValue: API_RESTDB_URL,
          multi: true
        },
        {
          provide: API_PROVIDER,
          useValue: API_RESTDB_KEY,
          multi: true
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationViewComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('userForm invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should check login field validity', () => {
    let name = component.userForm.controls['login'];
    expect(name.valid).toBeFalsy();
  });

  it('should check name field requirement', () => {
    let name = component.userForm.controls['login'];
    let errors = name.errors || {};
    expect(errors['required']).toBeTruthy();
  });
});
