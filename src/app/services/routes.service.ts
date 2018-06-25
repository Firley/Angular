import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_PROVIDER} from '../app.config';
import {Routes} from '../interfaces/routes';
import {USER_ROUTES_MOCK} from '../interfaces/user-routes-mock';
import {RouteDetails} from '../interfaces/route-details';
import {SearchData} from '../interfaces/search-data';

@Injectable()
export class RoutesService {

  private routesUrl = '/routes';
  private routesDetailsUrl = '/details';
  private usersUrl = '/travelers';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-apikey': this.config[1],
      'cache-control': 'no-cache'
    })
  };

  constructor(@Inject(API_PROVIDER) private config: any[],
              private http: HttpClient) {
  }

  /**
   * @param {SearchData} searchData
   * @returns {Observable<Routes[]>}
   */
  getRoutesListFromDB(searchData: SearchData): Observable<Routes[]> {
    let query = '?q={';
    let param1 = '';

    if (searchData.date !== null) {
      let dateLimit = new Date(searchData.date);
      dateLimit.setDate(dateLimit.getDate() + 1);
      let dateStart = new Date(searchData.date);
      dateStart.setDate(dateStart.getDate() -1);
      param1 = '"travelDate":{"$gte":{"$date":"' + dateStart.toISOString().slice(0, 10) + '"},"$lt":{"$date":"' + dateLimit.toISOString().slice(0, 10) + '"}}';
    }
    let param2 = searchData.cityFrom !== null && searchData.cityFrom !== '' ? ('"cityFrom":"' + searchData.cityFrom + '"') : '';

    let param3 = searchData.cityTo !== null && searchData.cityTo !== '' ? ('"cityTo":"' + searchData.cityTo + '"') : '';
    let endQuery = '}';
    let sort = '&sort=travelDate&dir=-1';
    let httpParams = query + param1 + ((param1 !== '' && param2 !== '') ? ',' : '')
      + param2 +
      ((param1 !== '' || param2 !== '') && param3 !== '' ? ',' : '') +
      param3 + endQuery + sort;

    return this.http.get<Routes[]>(this.config[0] + this.routesUrl + httpParams, this.httpOptions);
  }

  /**
   * @param {string} id
   * @returns {Observable<Routes>}
   */
  getRouteDetailsFromDB(id: string): Observable<Routes> {
    return this.http.get<Routes>(this.config[0] + this.routesUrl + '/' + id, this.httpOptions);
  }

  static getMockUserRoutes(): Observable<Routes[]> {
    return of(USER_ROUTES_MOCK);
  }

  /**
   * @param {string} id
   * @returns {Observable<Routes>}
   */
  getRouteById(id: string): Observable<Routes> {
    return this.http.get<Routes>(this.config[0] + this.routesUrl + '/' + id, this.httpOptions);
  }

  /**
   * @param idRoute
   * @param formData
   * @returns {Observable<Routes>}
   */
  editRoute(idRoute, formData): Observable<Routes> {
    let dateParts = formData['travelDate'].split('-');
    let travelDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    let parsedRouteData = {
      travelDate: travelDate,
      cityFrom: formData['cityFrom'],
      cityTo: formData['cityTo'],
    };

    return this.http.patch<Routes>(this.config[0] + this.routesUrl + '/' + idRoute, parsedRouteData, this.httpOptions);
  }

  /**
   * @param idRouteDetail
   * @param formData
   * @returns {Observable<Object>}
   */
  editRouteDetails(idRouteDetail, formData): Observable<Object>{
    let parsedRouteDetailsData = {
      carModel: formData['carModel'],
      carMake: formData['carMake'],
      carNo: formData['carNo'],
      routPrice: parseFloat(formData['routPrice']),
    };

    return this.http.patch(this.config[0] + this.routesDetailsUrl+ '/' + idRouteDetail, parsedRouteDetailsData, this.httpOptions);
  }

  /**
   * @param {string} userId
   * @returns {Observable<Object>}
   */
  getUserRoutes(userId: string): Observable<Object> {
    return this.http.get(this.config[0] + this.usersUrl + '/' + userId + '?referencedby=true', this.httpOptions);
  }

  /**
   * @param {Object} formData
   * @returns {Observable<Object>}
   */
  addRouteDetails(formData: Object): Observable<Object> {
    let parsedRouteDetailsData = {
      carModel: formData['carModel'],
      carMake: formData['carMake'],
      carNo: formData['carNo'],
      routPrice: parseFloat(formData['routPrice']),
      currency: 'PLN',
      freeSpace: formData['freeSpace']
    };
    return this.http.post(this.config[0] + this.routesDetailsUrl, parsedRouteDetailsData, this.httpOptions);
  }

  /**
   * @param {Object} formData
   * @param {string} routeDetailsId
   * @param {string} userId
   * @returns {Observable<Object>}
   */
  addRoute(formData: Object, routeDetailsId: string, userId: string): Observable<Object> {
    let dateParts = formData['travelDate'].split('-');
    let travelDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    let parsedRouteData = {
      travelDate: travelDate,
      cityFrom: formData['cityFrom'],
      cityTo: formData['cityTo'],
      rating: 1,
      routeDetails: [routeDetailsId],
      user: [userId],
    };

    return this.http.post(this.config[0] + this.routesUrl, parsedRouteData, this.httpOptions);
  }

  /**
   * @param {string} idRouteDetails
   * @param {number} newFreeSpace
   * @returns {Observable<Object>}
   */
  updateRouteDetailFreeSpace(idRouteDetails: string, newFreeSpace: number): Observable<RouteDetails> {

    let data = {
      freeSpace: newFreeSpace
    };

    return this.http.patch<RouteDetails>(this.config[0] + this.routesDetailsUrl + '/' + idRouteDetails, data, this.httpOptions);
  }
}

