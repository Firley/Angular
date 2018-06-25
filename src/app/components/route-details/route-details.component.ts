import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Routes} from '../../interfaces/routes';
import {RoutesService} from '../../services/routes.service';
import {AuthService} from '../../services/auth.service';
import {ReservationService} from '../../services/reservation.service';
import {UserService} from '../../services/user.service';
import {Reservation} from '../../interfaces/reservation';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss'],
  providers: [RoutesService, ReservationService, UserService]
})
export class RouteDetailsComponent implements OnInit {
  route: Routes;
  loading = true;
  reservationError = false;
  alreadyReservedError = false;

  /**
   * @param {ActivatedRoute} activatedUrl
   * @param {RoutesService} routeService
   * @param {AuthService} authService
   * @param {ReservationService} resService
   * @param {UserService} userService
   * @param {Router} router
   */
  constructor(private activatedUrl: ActivatedRoute,
              private routeService: RoutesService,
              public authService: AuthService,
              private resService: ReservationService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.activatedUrl.snapshot.paramMap.get('id');
    this.getRouteDetails(id);
  }

  /**
   * @param {string} id
   */
  getRouteDetails(id: string): void {
    this.routeService.getRouteDetailsFromDB(id).subscribe(response => {
      this.route = response;
      this.loading = false;
    });
  }

  /**
   * Method starts procedure of route reservation and checks if route was already reserved by the user
   * @param {string} idRoute
   * @param {string} idRouteDetail
   * @param {number} routeDetailFreeSpace
   */
  reserveRoute(idRoute: string, idRouteDetail: string, routeDetailFreeSpace: number): void {
    let idUser = this.userService.getLoggedIdUser();
    this.loading = true;
    this.alreadyReservedError = false;
    this.reservationError = false;

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
