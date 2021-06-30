import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planet } from 'src/app/models/planet';
import { GeneralService, Options } from './general.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  planets: Planet[] = [];
  count: number = 0;

  constructor(
    private generalService: GeneralService,
    private loadingService: LoadingService
  ) { }

  public getPlanets(page?: number, search?: string) {
    let params: HttpParams = new HttpParams();
    if (page)
      params = params.set('page', <any>page + 1);
    if (search)
      params = params.set('search', <any>search)
    let options: Options = { params };

    this.loadingService.setLoadingInteger(true);
    this.generalService.get('planets/', options).subscribe(res => {
      this.loadingService.setLoadingInteger(false);

      this.planets = res.results;
      this.count = res.count;

      this.planets.forEach(planet => {
        if (planet.films?.length) {
          planet.filmName = [];
          planet.films.forEach(filmAPI => {
            this.getFilm(filmAPI, planet);
          });
        }
      });
    });
  }

  getFilm(fullApi: string, planet: Planet) {
    this.loadingService.setLoadingInteger(true);
    this.generalService.getFullApi(fullApi).subscribe(res => {
      this.loadingService.setLoadingInteger(false);
      if (res?.body?.title)
        planet.filmName?.push(res.body.title);
    });
  }
}
