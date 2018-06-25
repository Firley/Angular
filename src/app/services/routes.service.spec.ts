import {TestBed, inject} from '@angular/core/testing';
import {RoutesService} from './routes.service';
import {API_RESTDB_URL, API_PROVIDER, API_RESTDB_KEY} from '../app.config';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {SearchData} from '../interfaces/search-data';

describe('RoutesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpClientModule],
      providers: [
        RoutesService,
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

  it('should be created', inject([RoutesService], (service: RoutesService) => {
    expect(service).toBeTruthy();
  }));

  it('should return not empty result', inject(
    [RoutesService], (service: RoutesService) => {
      let searchData = new SearchData();
      searchData.date = new Date();
      service.getRoutesListFromDB(searchData).subscribe(result => expect(result.length).toBeGreaterThan(0));
    }));

  it('should return not empty result', inject(
    [RoutesService], (service: RoutesService) => {
      RoutesService.getMockUserRoutes().subscribe(result => expect(result.length).toBeGreaterThan(0));
    }));

});

