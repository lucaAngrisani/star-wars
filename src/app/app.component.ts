import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './common/services/api/loading.service';

export interface Tab {
  label: string;
  index: number;
  path: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tabs: Tab[] = [
    { label: 'Login', index: 0, path: 'login' },
    { label: 'Registrazione', index: 1, path: 'registration' },
    { label: 'Pianeti', index: 2, path: 'planets' },
  ];

  selectedIndex: number = 0;

  constructor(
    public router: Router,
    public loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.selTab(location.pathname);
    this.router.events.subscribe((evt: any) => {
      if (evt.url)
        this.selTab(evt.url);
    });
  }

  selTab(path: string) {
    path = path?.replace('/', '');
    let selTab: Tab = this.tabs.find(tab => tab.path == path)!;
    this.selectedIndex = selTab?.index || this.tabs[0].index;

  }

  changeTab(index: number) {
    this.router.navigate([this.tabs.find(tab => tab.index == index)?.path]);
  }
}
