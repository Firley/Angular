import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  user: User;
  loading = true;
  editUserForm: FormGroup;
  showLoader = false;
  showSuccessInfo = false;
  showErrors = false;
  showNonUniqueMail = false;
  blockUserEditBtn = false;

  constructor(private userService: UserService, private router: Router, private activatedUrl: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.activatedUrl.snapshot.paramMap.get('id');

    this.loading = true;
    this.userService.getUserFromDB(id).subscribe(response => {
      this.user = response as User;

      this.editUserForm = new FormGroup({
        login: new FormControl(response.login, [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,20}$/),
        ]),
        userEmail: new FormControl(response.userEmail, [
          Validators.required,
          Validators.email
        ]),
        userPhone: new FormControl(response.userPhone, [
          Validators.required,
          Validators.pattern(/^\d{3}-\d{3}-\d{3}$/)
        ])
      });

      this.loading = false;
    });
  }

  editUserFormSubmit() {
    if (this.editUserForm.valid) {
      this.showLoader = true;
      this.blockUserEditBtn = true;
      this.editUserFormData(this.user._id, this.editUserForm.value);
    } else {
      this.validateAllFormFields(this.editUserForm);
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
   * @param {string} userID
   * @param {Object} formData
   */
  editUserFormData(userID: string, formData: Object): void {
    this.userService.editUser(userID, formData).subscribe(
      () => {
        this.showLoader = false;
        this.showSuccessInfo = true;

        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 3000);
      },
      (err: HttpErrorResponse) => {
        if (err.error.list[0].field === 'userEmail') {
          this.showNonUniqueMail = true;
          this.showLoader = false;
          this.blockUserEditBtn = false;
          this.editUserForm.reset();
        } else {
          this.showLoader = false;
          this.showErrors = true;
          this.blockUserEditBtn = false;
          this.editUserForm.reset();
        }
      });
  }
}
