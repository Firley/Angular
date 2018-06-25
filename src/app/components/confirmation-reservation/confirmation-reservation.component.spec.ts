import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationReservationComponent } from './confirmation-reservation.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {API_PROVIDER, API_RESTDB_KEY, API_RESTDB_URL} from '../../app.config';

describe('ConfirmationReservationComponent', () => {
  let component: ConfirmationReservationComponent;
  let fixture: ComponentFixture<ConfirmationReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationReservationComponent ],
      imports: [BrowserModule, HttpClientModule, RouterTestingModule],
      providers: [
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
    fixture = TestBed.createComponent(ConfirmationReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
