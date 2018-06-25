import {Component, OnInit} from '@angular/core';
import {RoutesService} from '../../services/routes.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-your-routes',
  templateUrl: './your-routes.component.html',
  styleUrls: ['./your-routes.component.scss'],
  providers: [RoutesService, UserService]
})
export class YourRoutesComponent implements OnInit {
  addRouteForm: FormGroup;
  actualDate: string;
  showLoader = false;
  showSuccessInfo = false;
  showErrors = false;
  addedRoute = false;

  constructor(private routeService: RoutesService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.actualDate = new Date().toISOString().split('T')[0];
    this.addRouteForm = new FormGroup({
      carModel: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      carMake: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      carNo: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      travelDate: new FormControl('', [
        Validators.required
      ]),
      cityFrom: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      cityTo: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      freeSpace: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(4)
      ]),
      routPrice: new FormControl('', [
        Validators.required
      ])
    });
  }

  formSubmit() {
    if (this.addRouteForm.valid) {
      this.showLoader = true;
      let userId = this.userService.getLoggedIdUser();
      this.addFormDataToRouteDetails(this.addRouteForm.value, userId);
      this.addedRoute = true;
    } else {
      this.validateAllFormFields(this.addRouteForm);
    }
  }

  /**
   * @param formData
   * @param userId
   */
  addFormDataToRouteDetails(formData, userId) {
    this.routeService.addRouteDetails(formData).subscribe(
      response => {
        this.addFormDataToRoutes(formData, response, userId);
      },
      () => {
        this.showErrorsDiv();
        this.addRouteForm.reset();
      });
  }

  /**
   * @param formData
   * @param response
   * @param userId
   */
  addFormDataToRoutes(formData, response, userId) {
    this.routeService.addRoute(formData, response['_id'], userId).subscribe(() => {
      this.showLoader = false;
      this.showSuccessInfo = true;

      setTimeout(() => {
        this.router.navigate(['/confirmation-add']);
      }, 5000);

    }, () => {
      this.showErrorsDiv();
      this.addRouteForm.reset();
    });
  }

  /**
   * Validates of form fields at once after submitting the form
   * @param {FormGroup} formGroup
   */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  showErrorsDiv() {
    this.showLoader = false;
    this.showErrors = true;
    this.addedRoute = false;
  }
}
