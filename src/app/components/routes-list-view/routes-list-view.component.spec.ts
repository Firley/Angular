import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {RoutesListViewComponent} from './routes-list-view.component';
import {API_RESTDB_URL, API_PROVIDER, API_RESTDB_KEY} from '../../app.config';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../services/user.service';
import {RoutesService} from '../../services/routes.service';
import {ReservationService} from '../../services/reservation.service';
import {AuthService} from '../../services/auth.service';
import {DatePipe} from '@angular/common';
import {SearchService} from '../../services/search.service';

describe('RoutesListViewComponent', () => {
  let component: RoutesListViewComponent;
  let fixture: ComponentFixture<RoutesListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoutesListViewComponent],
      imports: [BrowserModule, HttpClientModule, FormsModule, RouterTestingModule],
      providers: [
        UserService, RoutesService, ReservationService, AuthService, DatePipe, SearchService,
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
    fixture = TestBed.createComponent(RoutesListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create route list component', () => {
    expect(component).toBeTruthy();
  });
});
