import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  fullProfile: User;
  loading = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    let idUser = this.userService.getLoggedIdUser();
    this.loading = true;
    this.userService.getUserFromDB(idUser).subscribe(
      response => {
        this.fullProfile = response;
        this.loading = false;
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.fullProfile = null;
      }
    );
  }
}
