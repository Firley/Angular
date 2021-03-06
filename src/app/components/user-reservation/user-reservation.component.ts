import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {Reservation} from '../../interfaces/reservation';
import {ReservationService} from '../../services/reservation.service';

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: ['./user-reservation.component.scss'],
  providers: [ReservationService, UserService]
})
export class UserReservationComponent implements OnInit {

  userReservation: Reservation[];
  loading = true;

  constructor(private apiService: ReservationService, private userService: UserService) {
  }

  ngOnInit() {
    let idUser = this.userService.getLoggedIdUser();

    if (idUser !== '') {
      this.getUserReservations(idUser);
    }
  }

  /**
   * @param {string} idUser
   */
  getUserReservations(idUser: string): void {
    this.apiService.getUserReservations(idUser).subscribe(result => {
      if (result.hasOwnProperty('_referencedby') && result['_referencedby'].length > 0) {
        this.checkIfValidResult(result);
      } else {
        this.loading = false;
        this.userReservation = null;
      }
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.userReservation = null;
    });
  }

  /**
   * @param {Object} result
   */
  private checkIfValidResult(result: Object): void {
    if (result['_referencedby'][0]['collection'] === 'reservations') {
      this.userReservation = result['_referencedby'][0]['references'] as Reservation[];
      this.loading = false;
    } else if (result['_referencedby'][1]['collection'] === 'reservations') {
      this.userReservation = result['_referencedby'][1]['references'] as Reservation[];
      this.loading = false;
    } else {
      this.loading = false;
      this.userReservation = null;
    }
  }
}
