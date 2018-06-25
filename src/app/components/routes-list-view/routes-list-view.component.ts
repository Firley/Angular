import {Component, OnInit} from '@angular/core';
import {Routes} from '../../interfaces/routes';
import {RoutesService} from '../../services/routes.service';
import {ReservationService} from '../../services/reservation.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Reservation} from '../../interfaces/reservation';
import {SearchService} from '../../services/search.service';
import {SearchData} from '../../interfaces/search-data';

@Component({
  selector: 'app-routes-list-view',
  templateUrl: './routes-list-view.component.html',
  styleUrls: ['./routes-list-view.component.scss'],
  providers: [RoutesService, ReservationService, UserService]
})
export class RoutesListViewComponent implements OnInit {
  routes: Routes[];
  loading = true;
  reservationError = false;
  alreadyReservedError = false;
  searchDate: SearchData;
  blockReserveButton = false;

  constructor(private routeService: RoutesService,
              private resService: ReservationService,
              private userService: UserService,
              private router: Router,
              public authService: AuthService,
              public searchService: SearchService) {
  }

  ngOnInit() {
    this.searchService.getSearchData().subscribe((searchedRoute: SearchData) => this.searchDate = searchedRoute);
    this.getRoutesList();
  }

  getRoutesList(): void {
    this.routeService.getRoutesListFromDB(this.searchDate).subscribe(
      response => {
        this.routes = response;
        this.loading = false;
      }
    );
  }

  /**
   * Method starts procedure of route reservation and checks if route was already reserved by the user
   * @param {string} idRoute
   * @param {string} idRouteDetail
   * @param {number} routeDetailFreeSpace
   */
  reserveRoute(idRoute: string, idRouteDetail: string, routeDetailFreeSpace: number): void {
    this.blockReserveButton = true;
    this.loading = true;
    this.alreadyReservedError = false;
    this.reservationError = false;
    let idUser = this.userService.getLoggedIdUser();

    this.resService.getReservationByUserAndRoute(idRoute, idUser).subscribe(
      result => {
        if (result.length > 0) {
          this.loading = false;
          this.alreadyReservedError = true;
        } else {
          this.checkRouteDetailFreeSpace(idRoute, idRouteDetail, routeDetailFreeSpace);
        }
      },
      () => {
        this.loading = false;
        this.reservationError = true;
        this.blockReserveButton = false;
      });
  }

  /**
   * Method checks if there is valid number of free space in car while reserving the route
   * @param {string} idRoute
   * @param {string} idRouteDetail
   * @param {number} routeDetailFreeSpace
   */
  checkRouteDetailFreeSpace(idRoute: string, idRouteDetail: string, routeDetailFreeSpace: number): void {
    let newFreeSpace = routeDetailFreeSpace - 1;

    if (newFreeSpace >= 0) {
      this.updateRouteDetailsForReservation(idRoute, idRouteDetail, newFreeSpace);
    }
  }

  /**
   * Method updates route details with new free space number while reserving the route
   * @param idRoute
   * @param idRouteDetail
   * @param newFreeSpace
   */
  updateRouteDetailsForReservation(idRoute: string, idRouteDetail: string, newFreeSpace: number): void {
    this.routeService.updateRouteDetailFreeSpace(idRouteDetail, newFreeSpace).subscribe(
      () => {
        this.addUserReservation(idRoute);
      },
      () => {
        this.loading = false;
        this.reservationError = true;
        this.blockReserveButton = false;
      });
  }

  /**
   * Method adds reservation for logged user
   * @param {string} idRoute
   */
  addUserReservation(idRoute: string): void {
    let idUser = this.userService.getLoggedIdUser();

    let data = {
      'user': [idUser],
      'route': [idRoute]
    };

    this.resService.addUserReservation(data).subscribe(
      response => {
        this.sendEmailToRouteOwner(response);
      },
      () => {
        this.loading = false;
        this.reservationError = true;
        this.blockReserveButton = false;
      });
  }

  /**
   * Method sends email to route owner
   * @param {Reservation} response
   */
  sendEmailToRouteOwner(response: Reservation): void {
    let route = response.route[0] as Routes;
    let routeOwnerEmail = route.user[0].userEmail;

    this.userService.sendEmailToUser(routeOwnerEmail, route).subscribe(
      () => {
        setTimeout(() => {
          this.router.navigate(['/confirmation-reservation']);
        }, 2000);
      },
      () => {
        this.loading = false;
        this.reservationError = true;
        this.blockReserveButton = false;
      });
  }

  /**
   * Method checks logged user reservation permissions
   * @param {string} idRouteUser
   * @returns {boolean}
   */
  checkReservePermissions(idRouteUser: string): boolean {
    if (this.authService.isAuthenticated()) {
      return this.userService.isLoggedUserNotRouteOwner(idRouteUser);
    } else {
      return false;
    }
  }
}
