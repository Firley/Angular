import {NgModule} from '@angular/core';
import {ProfileComponent} from './components/profile/profile.component';
import {UserChoiceComponent} from './components/user-choice/user-choice.component';
import {RegistrationViewComponent} from './components/registration-view/registration-view.component';
import {RoutesListViewComponent} from './components/routes-list-view/routes-list-view.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ConfirmationAddComponent} from './components/confirmation-add/confirmation-add.component';
import {SearchViewComponent} from './components/search-view/search-view.component';
import {UserReservationComponent} from './components/user-reservation/user-reservation.component';
import {ConfirmationReservationComponent} from './components/confirmation-reservation/confirmation-reservation.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {UserRoutesComponent} from './components/user-routes/user-routes.component';
import {AboutUsComponent} from './components/about-us/about-us.component';
import {YourRoutesComponent} from './components/your-routes/your-routes.component';
import {RouteDetailsComponent} from './components/route-details/route-details.component';
import {RouteEditComponent} from './components/route-edit/route-edit.component';
import {Routes, RouterModule} from '@angular/router';
import {UserEditComponent} from './components/user-edit/user-edit.component';

const appRoutes: Routes = [
  {path: 'registration', component: RegistrationViewComponent},
  {path: 'home', component: SearchViewComponent},
  {path: 'route-list', component: RoutesListViewComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'user-edit/:id', component: UserEditComponent, canActivate: [AuthGuardService]},
  {path: 'user-routes', component: UserRoutesComponent, canActivate: [AuthGuardService]},
  {path: 'user-reservations', component: UserReservationComponent, canActivate: [AuthGuardService]},
  {path: 'route-details/:id', component: RouteDetailsComponent},
  {path: 'user-choice', component: UserChoiceComponent, canActivate: [AuthGuardService]},
  {path: 'edit-route/:id', component: RouteEditComponent, canActivate: [AuthGuardService]},
  {path: 'your-routes', component: YourRoutesComponent, canActivate: [AuthGuardService]},
  {path: 'confirmation-add', component: ConfirmationAddComponent},
  {path: 'confirmation-reservation', component: ConfirmationReservationComponent},
  {path: 'about-us', component: AboutUsComponent},
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
