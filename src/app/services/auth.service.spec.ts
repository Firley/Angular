import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {BrowserModule} from '@angular/platform-browser';
import {API_PROVIDER, API_RESTDB_KEY, API_RESTDB_URL} from '../app.config';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthGuardService} from './auth-guard.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpClientModule, RouterTestingModule],
      providers: [
        AuthService,
        AuthGuardService,
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
      ],
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
