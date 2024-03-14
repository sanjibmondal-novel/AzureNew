import { Component, OnInit } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const title = document.querySelector('head > title') as HTMLTitleElement;
    title.innerText = AppConfigService.appConfig.app.title;
  }
}
