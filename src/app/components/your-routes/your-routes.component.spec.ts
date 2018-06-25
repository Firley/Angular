import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {YourRoutesComponent} from './your-routes.component';
import {API_PROVIDER, API_RESTDB_KEY, API_RESTDB_URL} from '../../app.config';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ProgressbarModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {UserService} from '../../services/user.service';

describe('YourRoutesComponent', () => {
  let component: YourRoutesComponent;
  let fixture: ComponentFixture<YourRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YourRoutesComponent],
      imports: [BrowserModule, HttpClientModule, RouterTestingModule, ProgressbarModule, FormsModule, ReactiveFormsModule],
      providers: [
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
    fixture = TestBed.createComponent(YourRoutesComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create your-routes form component', () => {
    expect(component).toBeTruthy();
  });

  it('addRouteForm invalid when empty', () => {
    expect(component.addRouteForm.valid).toBeFalsy();
  });

  it('should check carModel field validity', () => {
    let carModel = component.addRouteForm.controls['carModel'];
    expect(carModel.valid).toBeFalsy();
  });

  it('should check carModel field requirement', () => {
    let carModel = component.addRouteForm.controls['carModel'];
    let errors = carModel.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should check validity with good data', () => {
    expect(component.addRouteForm.valid).toBeFalsy();
    component.addRouteForm.controls['carModel'].setValue("Fiat");
    component.addRouteForm.controls['carMake'].setValue("Punto");
    component.addRouteForm.controls['carNo'].setValue("GWE17216");
    component.addRouteForm.controls['travelDate'].setValue("12-07-2018");
    component.addRouteForm.controls['cityFrom'].setValue("Szczecin");
    component.addRouteForm.controls['cityTo'].setValue("Bydgoszcz");
    component.addRouteForm.controls['freeSpace'].setValue(1);
    component.addRouteForm.controls['routPrice'].setValue(10.00);
    expect(component.addRouteForm.valid).toBeTruthy();
  });
});
