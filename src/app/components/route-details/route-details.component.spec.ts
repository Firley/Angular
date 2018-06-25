import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouteDetailsComponent} from './route-details.component';
import {HttpClientModule} from '@angular/common/http';
import {API_RESTDB_URL, API_PROVIDER, API_RESTDB_KEY} from '../../app.config';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {RoutesService} from '../../services/routes.service';
import {ReservationService} from '../../services/reservation.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {DatePipe} from '@angular/common';

describe('RouteDetailsComponent', () => {
  let component: RouteDetailsComponent;
  let fixture: ComponentFixture<RouteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RouteDetailsComponent],
      imports: [BrowserModule, HttpClientModule, FormsModule, RouterTestingModule],
      providers: [
        UserService, RoutesService, ReservationService, AuthService, DatePipe,
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
    fixture = TestBed.createComponent(RouteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create route details component', () => {
    expect(component).toBeTruthy();
  });
});
