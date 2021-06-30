import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { GeneralService } from './general.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private generalService: GeneralService
  ) { }

  public registerUser(user?: User) {
    console.log(user);
    this.generalService.post('check-username/', { "username": user?.username }).subscribe(resCheck => {
      console.log(resCheck);
      this.generalService.post('registration/', user).subscribe(res => {
        console.log(res);
      });
    });
  }

}
