import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_PROVIDER} from '../app.config';
import {Observable} from 'rxjs/Observable';
import {Routes} from '../interfaces/routes';
import {DatePipe} from '@angular/common';
import {User} from '../interfaces/user';

@Injectable()
export class UserService {

  private usersUrl = '/travelers';
  private mailUrl = '/mail';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-apikey': this.config[1],
      'Cache-Control': 'no-cache'
    })
  };

  /**
   * @param {any[]} config
   * @param {HttpClient} http
   * @param {DatePipe} datepipe
   */
  constructor(@Inject(API_PROVIDER) private config: any[],
              private http: HttpClient, private datepipe: DatePipe) {
  }

  /**
   * @param {Object} formData
   * @returns {Observable<Object>}
   */
  addUser(formData: Object): Observable<Object> {

    let parsedUserData = {
      login: formData['login'],
      userEmail: formData['userEmail'],
      password: formData['passwords']['password'],
      userPhone: formData['userPhone']
    };

    return this.http.post(this.config[0] + this.usersUrl, parsedUserData, this.httpOptions);
  }

  /**
   *
   * @param {string} idUser
   * @param {Object} formData
   * @returns {Observable<Object>}
   */
  editUser(idUser: string, formData: Object): Observable<Object> {
    let editFormData = {
      login: formData['login'],
      userEmail: formData['userEmail'],
      userPhone: formData['userPhone']
    };

    return this.http.patch(this.config[0] + this.usersUrl + '/' + idUser, editFormData, this.httpOptions);
  }

  /**
   * @param {string} userID
   * @returns {Observable<User>}
   */
  getUserFromDB(userID: string): Observable<User> {
    return this.http.get<User>(this.config[0] + this.usersUrl + '/' + userID, this.httpOptions);
  }

  /**
   * @returns {any}
   */
  getLoggedIdUser(): string {
    let loggedUserProfile = JSON.parse(localStorage.getItem('userProfile'));
    let result = '';

    if (loggedUserProfile !== null) {
      let sub = loggedUserProfile['sub'];
      let arrData = sub.split('auth0|');
      result = arrData[1];
    }

    return result;
  }

  getLoggedUserProfile(): Object {
    let loggedUserProfile = JSON.parse(localStorage.getItem('userProfile'));

    return loggedUserProfile !== null ? loggedUserProfile : null;
  }

  /**
   * @param {string} idRouteUser
   * @returns {boolean}
   */
  isLoggedUserNotRouteOwner(idRouteUser: string): boolean {
    let idUser = this.getLoggedIdUser();

    return idRouteUser !== idUser;
  }

  /**
   * @returns {string}
   */
  getUsername(): string {
    let loggedUserProfile = JSON.parse(localStorage.getItem('userProfile'));
    let result = '';

    if (loggedUserProfile !== null) {
      result = loggedUserProfile['nickname'];
    }

    return result;
  }

  /**
   * @param {string} routeOwnerEmail
   * @param {Routes} route
   * @returns {Observable<Object>}
   */
  sendEmailToUser(routeOwnerEmail: string, route: Routes): Observable<Object> {
    let profile = this.getLoggedUserProfile();
    let travelDate = this.datepipe.transform(route.travelDate, 'dd-MM-yyyy');
    let html = '<h3>Witaj!</h3><p>Użytkownik: <b>' + profile['nickname'] + '</b> zarezerwował Twój przejazd o id: <b>' + route._id + '</b>, który odbędzie się w terminie: ' + travelDate + ' na odcinku: ' + route.cityFrom + '-' + route.cityTo + '.<br><br> Skontaktuj się z nim przy pomocy emaila: ' + profile['email'] + ', aby omówić dalsze szczegóły przejazdu.<br><br>Dziękujemy za skorzystanie z usługi. <br><br> Pozdrawiamy, <br><br> zespół Codebusters </p> <hr> Ta wiadomość została wygenerowana automatycznie. Prosimy na nią nie odpowiadać.';

    let mailData = {
      'to': routeOwnerEmail,
      'subject': 'Informacja od Przejazdomatu',
      'html': html,
      'company': 'Przejazdomat by Codebusters 2018',
      'sendername': 'Przejazdomat'
    };

    let newUrl = this.config[0].slice(0, -5);

    return this.http.post(newUrl + this.mailUrl, mailData, this.httpOptions);
  }
}
