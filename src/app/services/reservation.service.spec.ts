import {TestBed, inject} from '@angular/core/testing';
import {ReservationService} from './reservation.service';
import {API_RESTDB_URL, API_PROVIDER, API_RESTDB_KEY} from '../app.config';

import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

describe('ReservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpClientModule],
      providers: [ReservationService,
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

  it('should be created', inject([ReservationService], (service: ReservationService) => {
    expect(service).toBeTruthy();
  }));

  it('should return not empty result', inject(
    [ReservationService], (service: ReservationService) => {
      let userId = '5b184490b7e1ba0a00112517';
      service.getUserReservations(userId).subscribe(result => expect(result.length).toBeGreaterThan(0));
    }));

});
