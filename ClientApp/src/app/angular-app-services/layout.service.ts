import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config.service';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    private baseUrl = `${AppConfigService.appConfig.api.url}/api/meta-data`;

    constructor(private http: HttpClient) { }

    getLayout(entityName: string, layoutType: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${entityName}/layout?layoutType=${layoutType}`);
    }
}
