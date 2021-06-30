import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/common/services/api/user.service';
import { FormService } from 'src/app/common/services/form.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  frmRegister: FormGroup;

  hideP1: boolean = true;
  hideP2: boolean = true;

  constructor(
    public router: Router,
    public formService: FormService,
    public userService: UserService
  ) {
    this.frmRegister = formService.createSignupForm();
  }

  setUser(): User {
    let user = new User();

    user.firstname = this.frmRegister.get('firstname')?.value;
    user.lastname = this.frmRegister.get('lastname')?.value;
    user.username = this.frmRegister.get('username')?.value;
    user.password = this.frmRegister.get('password')?.value;

    return user;
  }

}
