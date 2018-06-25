import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-registration-view',
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.scss'],
  providers: [UserService]
})
export class RegistrationViewComponent implements OnInit {
  userForm: FormGroup;
  showLoader = false;
  showSuccessInfo = false;
  showErrors = false;
  showNonUniqueMail = false;
  blockButton = false;

  constructor(private userService: UserService, private router: Router, public authService: AuthService) {
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,20}$/),
      ]),
      userEmail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      userPhone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{3}-\d{3}-\d{3}$/)
      ]),
      regulation_confirm: new FormControl('', [
        Validators.required
      ]),
      passwords: new FormGroup({
        password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,20}$/)
        ])),
        confirm_password: new FormControl('', Validators.required)
      }, this.passwordMatchValidator)
    });
  }

  /**
   * Method validates password and confirm_password field if they are equal
   * @param {FormGroup} group
   * @returns {{mismatch: boolean}}
   */
  passwordMatchValidator(group: FormGroup) {
    return group.get('password').value === group.get('confirm_password').value
      ? null : {'mismatch': true};
  }

  userFormSubmit() {
    if (this.userForm.valid) {
      this.showLoader = true;
      this.blockButton = true;
      this.addUserFormData(this.userForm.value);
    } else {
      this.validateAllFormFields(this.userForm);
    }
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

  /**
   * @param formData
   */
  addUserFormData(formData) {
    this.userService.addUser(formData).subscribe(
      () => {
        this.showLoader = false;
        this.showSuccessInfo = true;

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      (err: HttpErrorResponse) => {
        if (err.error.list[0].field === 'userEmail') {
          this.showNonUniqueMail = true;
          this.showLoader = false;
          this.blockButton = false;
          this.userForm.reset();
        } else {
          this.showLoader = false;
          this.showErrors = true;
          this.userForm.reset();
          this.blockButton = false;
        }
      });
  }
}

