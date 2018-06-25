import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserReservationComponent } from './user-reservation.component';
import {HttpClientModule} from '@angular/common/http';
import {API_RESTDB_URL, API_PROVIDER, API_RESTDB_KEY} from '../../app.config';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {DatePipe} from '@angular/common';
import {UserService} from '../../services/user.service';
import {ReservationService} from '../../services/reservation.service';

describe('UserReservationComponent', () => {
  let component: UserReservationComponent;
  let fixture: ComponentFixture<UserReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReservationComponent],
      imports: [BrowserModule, HttpClientModule, RouterTestingModule],
      providers: [
        UserService, DatePipe, ReservationService,
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
    fixture = TestBed.createComponent(UserReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create user-reservation', () => {
    expect(component).toBeTruthy();
  });
});
