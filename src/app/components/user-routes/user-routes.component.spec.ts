import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoutesComponent } from './user-routes.component';
import {HttpClientModule} from '@angular/common/http';
import {API_RESTDB_URL, API_PROVIDER, API_RESTDB_KEY} from '../../app.config';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../services/user.service';
import {RoutesService} from '../../services/routes.service';
import {DatePipe} from '@angular/common';

describe('UserRoutesComponent', () => {
  let component: UserRoutesComponent;
  let fixture: ComponentFixture<UserRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoutesComponent ],
      imports: [BrowserModule, HttpClientModule, RouterTestingModule],
      providers: [
        UserService,
        RoutesService,
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
    fixture = TestBed.createComponent(UserRoutesComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create user-routes', () => {
    expect(component).toBeTruthy();
  });
});

