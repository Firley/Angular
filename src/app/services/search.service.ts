import {Injectable} from '@angular/core';
import {SearchData} from '../interfaces/search-data';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchService {
  private searchData = new SearchData();
  private searchSubject = new BehaviorSubject<SearchData>(this.searchData);

  constructor() {
    this.searchData.cityFrom = '';
    this.searchData.cityTo = '';
    this.searchData.date = null;
  }

  getSearchData(): Observable<SearchData> {
    return this.searchSubject.asObservable();
  }

  setSearchData(startPlace: string, endPlace: string, date?: Date) {
    this.searchData.cityFrom = startPlace;
    this.searchData.cityTo = endPlace;
    this.searchData.date = date;
    this.searchSubject.next(this.searchData);
  }

  clearSearchDate() {
    this.searchData.cityFrom = '';
    this.searchData.cityTo = '';
    this.searchData.date = null;
    this.searchSubject.next(this.searchData);
  }
}
