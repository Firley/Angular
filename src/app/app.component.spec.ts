import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {API_PROVIDER, API_RESTDB_KEY, API_RESTDB_URL} from './app.config';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, FooterComponent, HeaderComponent
      ],
      imports: [BrowserModule, HttpClientModule, RouterTestingModule],
      providers: [
        AuthService,
        AuthGuardService,
        {
          provide: API_PROVIDER,
          useValue: API_RESTDB_URL,
          multi: true
        },
        {
          provide: API_PROVIDER,
          useValue: API_RESTDB_KEY,
          multi: true
        }
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
