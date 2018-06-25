import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserEditComponent} from './user-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {API_PROVIDER, API_RESTDB_KEY, API_RESTDB_URL} from '../../app.config';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ProgressbarModule} from 'ngx-bootstrap';
import {BrowserModule} from '@angular/platform-browser';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditComponent],
      imports: [BrowserModule, HttpClientModule, RouterTestingModule, ProgressbarModule, FormsModule, ReactiveFormsModule], providers: [
        UserService, DatePipe,
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create user-edit component', () => {
    expect(component).toBeTruthy();
  });
});
