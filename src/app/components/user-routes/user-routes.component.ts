import {Component, OnInit} from '@angular/core';
import {RoutesService} from '../../services/routes.service';
import {Routes} from '../../interfaces/routes';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-routes',
  templateUrl: './user-routes.component.html',
  styleUrls: ['./user-routes.component.scss'],
  providers: [RoutesService, UserService]
})
export class UserRoutesComponent implements OnInit {

  userRoutes: Routes[];
  loading = true;

  constructor(private apiService: RoutesService, private userService: UserService) {
  }

  ngOnInit() {
    let userId = this.userService.getLoggedIdUser();

    if (userId !== '') {
      this.getUserRoutes(userId);
    }
  }

  /**
   * @param {string} userId
   */
  getUserRoutes(userId: string): void {
    this.apiService.getUserRoutes(userId).subscribe(result => {
      if (result.hasOwnProperty('_referencedby') && result['_referencedby'].length > 0) {
        this.checkIfValidResult(result);
      } else {
        this.loading = false;
        this.userRoutes = null;
      }
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.userRoutes = null;
    });
  }

  /**
   * @param {Object} result
   */
  private checkIfValidResult(result: Object): void {
    if (result['_referencedby'][0]['collection'] === 'routes') {
      this.userRoutes = result['_referencedby'][0]['references'] as Routes[];
      this.loading = false;
    } else if (result['_referencedby'][1]['collection'] === 'routes') {
      this.userRoutes = result['_referencedby'][1]['references'] as Routes[];
      this.loading = false;
    } else {
      this.loading = false;
      this.userRoutes = null;
    }
  }
}
