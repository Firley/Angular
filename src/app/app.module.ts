import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProgressbarModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {API_PROVIDER, API_RESTDB_URL, API_RESTDB_KEY} from './app.config';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {SearchViewComponent} from './components/search-view/search-view.component';
import {RoutesListViewComponent} from './components/routes-list-view/routes-list-view.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {RegistrationViewComponent} from './components/registration-view/registration-view.component';
import {UserRoutesComponent} from './components/user-routes/user-routes.component';
import {RouteDetailsComponent} from './components/route-details/route-details.component';
import {UserChoiceComponent} from './components/user-choice/user-choice.component';
import {RouteEditComponent} from './components/route-edit/route-edit.component';
import {YourRoutesComponent} from './components/your-routes/your-routes.component';
import {AuthService} from './services/auth.service';
import {ProfileComponent} from './components/profile/profile.component';
import {AuthGuardService} from './services/auth-guard.service';
import {CallbackComponent} from './components/callback/callback.component';
import {UserReservationComponent} from './components/user-reservation/user-reservation.component';
import {AboutUsComponent} from './components/about-us/about-us.component';
import {ConfirmationReservationComponent} from './components/confirmation-reservation/confirmation-reservation.component';
import {ConfirmationAddComponent} from './components/confirmation-add/confirmation-add.component';
import {DatePipe} from '@angular/common';
import {SearchService} from './services/search.service';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {AppRoutingModule} from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationAddComponent,
    ConfirmationReservationComponent,
    HeaderComponent,
    FooterComponent,
    SearchViewComponent,
    RoutesListViewComponent,
    PageNotFoundComponent,
    RegistrationViewComponent,
    UserRoutesComponent,
    RouteDetailsComponent,
    UserChoiceComponent,
    RouteEditComponent,
    YourRoutesComponent,
    ProfileComponent,
    CallbackComponent,
    AboutUsComponent,
    UserReservationComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ProgressbarModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: API_PROVIDER,
      useValue: API_RESTDB_URL,
      multi: true
    },
    {
      provide: API_PROVIDER,
      useValue: API_RESTDB_KEY,
      multi: true
    },
    AuthService,
    AuthGuardService,
    DatePipe,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
