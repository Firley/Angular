import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationAddComponent } from './confirmation-add.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {RoutesService} from '../../services/routes.service';
import {ReservationService} from '../../services/reservation.service';
import {API_PROVIDER, API_RESTDB_KEY, API_RESTDB_URL} from '../../app.config';
import {UserService} from '../../services/user.service';

describe('ConfirmationAddComponent', () => {
  let component: ConfirmationAddComponent;
  let fixture: ComponentFixture<ConfirmationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationAddComponent ],
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
    fixture = TestBed.createComponent(ConfirmationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
