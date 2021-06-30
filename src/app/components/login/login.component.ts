import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/common/services/form.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  showError: boolean = false;
  hide: boolean = true;

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.user?.username == "Luke" && this.user?.password == "skywalker") {
      this.showError = true;
      this.router.navigate(['planets']);
    } else {
      this.showError = true;
    }
  }

}
