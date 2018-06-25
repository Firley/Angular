import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChoiceComponent } from './user-choice.component';
import {RouterTestingModule} from '@angular/router/testing';

import {API_RESTDB_URL, API_PROVIDER, API_RESTDB_KEY} from '../../app.config';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {DatePipe} from '@angular/common';

describe('UserChoiceComponent', () => {
  let component: UserChoiceComponent;
  let fixture: ComponentFixture<UserChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserChoiceComponent],
      imports: [BrowserModule, HttpClientModule, RouterTestingModule],
      providers: [
        UserService, AuthService, DatePipe,
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
    fixture = TestBed.createComponent(UserChoiceComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create user-choice component', () => {
    expect(component).toBeTruthy();
  });
});
