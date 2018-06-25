import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_PROVIDER} from '../app.config';
import {Observable} from 'rxjs/Observable';
import {Reservation} from '../interfaces/reservation';

@Injectable()
export class ReservationService {

  private reservationUrl = '/reservations';
  private usersUrl = '/travelers';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-apikey': this.config[1],
      'cache-control': 'no-cache'
    })
  };

  /**
   * @param {any[]} config
   * @param {HttpClient} http
   */
  constructor(@Inject(API_PROVIDER) private config: any[],
              private http: HttpClient) {
  }

  /**
   * @param {string} userId
   * @returns {Observable<any[]>}
   */
  getUserReservations(userId: string): Observable<any[]> {
    return this.http.get<any[]>(this.config[0] + this.usersUrl + '/' + userId + '?referencedby=true', this.httpOptions);
  }
  /**
   * @param {string} idRoute
   * @param {string} idUser
   * @returns {Observable<Reservation>}
   */
  getReservationByUserAndRoute(idRoute: string, idUser: string): Observable<any[]> {
    return this.http.get<any[]>(this.config[0] + this.reservationUrl + '?q={"route.0._id": "' + idRoute + '","user.0._id": "' + idUser +'"}', this.httpOptions);
  }

  /**
   * @param {Object} data
   * @returns {Observable<Object>}
   */
  addUserReservation(data: Object): Observable<Reservation> {
    return this.http.post<Reservation>(this.config[0] + this.reservationUrl, data, this.httpOptions);
  }
}
