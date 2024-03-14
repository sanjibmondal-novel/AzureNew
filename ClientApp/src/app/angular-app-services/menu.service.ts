import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuUrl = `${AppConfigService.appConfig.api.url}/api/meta-data/menu`;

  constructor(private http: HttpClient) { }

  getMenu(): Observable<any> {
    return this.http.get<any>(this.menuUrl);
  }
}
