import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PlanetService } from 'src/app/common/services/api/planet.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['nome', 'popolazione', 'diametro', 'terreno', 'film'];

  search: string = '';

  constructor(
    public planetService: PlanetService
  ) {
    planetService.getPlanets();
  }

  getPlanetFromPage(evt: PageEvent) {
    this.planetService.getPlanets(evt.pageIndex);
  }

  searchPlanets() {
    this.planetService.getPlanets(0,this.search);
  }

}
