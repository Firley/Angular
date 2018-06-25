import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchViewComponent } from './search-view.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {ReservationService} from '../../services/reservation.service';
import {UserService} from '../../services/user.service';
import {API_PROVIDER, API_RESTDB_KEY, API_RESTDB_URL} from '../../app.config';
import {SearchService} from '../../services/search.service';
import {RoutesService} from '../../services/routes.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('SearchViewComponent', () => {
  let component: SearchViewComponent;
  let fixture: ComponentFixture<SearchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchViewComponent ],
      imports: [BrowserModule, HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
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
    fixture = TestBed.createComponent(SearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
