import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserValidator } from 'src/app/validators/user.validator';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  fb: FormBuilder = new FormBuilder();

  constructor() { }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        username: [null, Validators.required],
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        confirmPassword: [null, Validators.compose([Validators.required])],
        password: [null, Validators.compose([
          // 1. Password Field is Required
          Validators.required,
          // 2. check whether the entered password has a number
          UserValidator.patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
          UserValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          UserValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. Has a minimum length of 8 characters
          Validators.minLength(8)])
        ]
      },
      {
        // check whether our password and confirm password match
        validator: UserValidator.passwordMatchValidator
      });
  }

  showError(errors: ValidationErrors) {
    if (errors.required) {
      return 'Il campo è obbligatorio';
    } else if (errors.hasCapitalCase) {
      return 'Il campo deve contenere almeno una lettera maiuscola';
    } else if (errors.hasSmallCase) {
      return 'Il campo deve contenere almeno una lettera minuscola';
    } else if (errors.hasNumber) {
      return 'Il campo deve contenere almeno un numero';
    } else if (errors.minlength) {
      return 'Il campo deve essere di almeno '+errors.minlength.requiredLength+' caratteri';
    } else if (errors.NoPassswordMatch) {
      return 'Le due password inserite non coincidono';
    } else {
      return null;
    }
  }
}
