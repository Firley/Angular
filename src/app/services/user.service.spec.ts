import {TestBed, inject} from '@angular/core/testing';
import {UserService} from './user.service';
import {API_PROVIDER, API_RESTDB_KEY, API_RESTDB_URL} from '../app.config';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpClientModule],
      providers: [UserService, DatePipe,
        {
          provide: API_PROVIDER,
          useValue: API_RESTDB_URL,
          multi: true
        },
        {
          provide: API_PROVIDER,
          useValue: API_RESTDB_KEY,
          multi: true
        }],
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
