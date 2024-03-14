import { Component } from '@angular/core';
import { LoaderService } from '../angular-app-services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    protected loaderService: LoaderService
  ) { }

}
