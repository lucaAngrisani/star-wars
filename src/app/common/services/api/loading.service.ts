import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading: boolean = false;
  private loadingInteger: number = 0;

  constructor() { }

  setLoadingInteger(bool: boolean) {
    if (bool)
      this.loadingInteger++;
    else
      this.loadingInteger--;

    if (this.loadingInteger <= 0) {
      this.isLoading = false;
      this.loadingInteger = 0;
    } else {
      setTimeout(() => {
        if (this.loadingInteger > 0)
          this.isLoading = true;
      }, 200);
    }
  }

  setLoading(bool: boolean) {
    this.loadingInteger = 0;
    this.setLoadingInteger(bool);
  }

}
