import {Component, OnInit} from '@angular/core';
import {RoutesService} from '../../services/routes.service';
import {Routes} from '../../interfaces/routes';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteDetails} from '../../interfaces/route-details';

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.scss'],
  providers: [RoutesService]
})
export class RouteEditComponent implements OnInit {
  route: Routes;
  loading = true;
  editRouteForm: FormGroup;
  showLoader = false;
  showSuccessInfo = false;
  showErrors = false;
  blockEditBtn = false;

  constructor(private activatedUrl: ActivatedRoute, private routeService: RoutesService, private router: Router) {
  }

  ngOnInit() {
    const id = this.activatedUrl.snapshot.paramMap.get('id');
    this.loading = true;
    this.routeService.getRouteById(id).subscribe(
      response => {
        this.route = response as Routes;
        const routeTravelDate = new Date(response.travelDate).toISOString().split('T')[0];

        this.editRouteForm = new FormGroup({
          carModel: new FormControl(response.routeDetails[0].carModel, [
            Validators.required,
            Validators.minLength(1)
          ]),
          carMake: new FormControl(response.routeDetails[0].carMake, [
            Validators.required,
            Validators.minLength(1)
          ]),
          carNo: new FormControl(response.routeDetails[0].carNo, [
            Validators.required,
            Validators.minLength(3)
          ]),
          travelDate: new FormControl(routeTravelDate, [
            Validators.required
          ]),
          cityFrom: new FormControl(response.cityFrom, [
            Validators.required,
            Validators.minLength(1)
          ]),
          cityTo: new FormControl(response.cityTo, [
            Validators.required,
            Validators.minLength(1)
          ]),
          routPrice: new FormControl(response.routeDetails[0].routPrice, [
            Validators.required
          ])
        });
        this.loading = false;
      });
  }

  formSubmit() {
    if (this.editRouteForm.valid) {
      this.showLoader = true;
      this.blockEditBtn = true;
      this.editFormDataToRoutes(this.route._id, this.editRouteForm.value);
    } else {
      this.validateAllFormFields(this.editRouteForm);
    }
  }

  /**
   * @param idRoute
   * @param formData
   */
  editFormDataToRoutes(idRoute: string, formData: Object): void {
    this.routeService.editRoute(idRoute, formData).subscribe(response => {
      this.editFormDataToRouteDetails(formData, response);
    }, () => {
      this.showErrorsDiv();
      this.editRouteForm.reset();
    });
  }

  /**
   * @param {Object} formData
   * @param {Routes} route
   */
  editFormDataToRouteDetails(formData: Object, route: Routes): void {
    const details = route.routeDetails[0] as RouteDetails;

    this.routeService.editRouteDetails(details._id, formData).subscribe(
      () => {
        this.showLoader = false;
        this.showSuccessInfo = true;

        setTimeout(() => {
          this.router.navigate(['/user-routes']);
        }, 2000);
      },
      () => {
        this.showErrorsDiv();
        this.editRouteForm.reset();
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
    this.blockEditBtn = false;
  }
}

