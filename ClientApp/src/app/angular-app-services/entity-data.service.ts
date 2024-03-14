import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config.service';

@Injectable({
    providedIn: 'root'
})
export class EntityDataService {
    private baseUrl = `${AppConfigService.appConfig.api.url}/api`;

    constructor(private http: HttpClient) { }

    addRecord(entityName: string, data: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${entityName}`, data);
    }

    getRecord(entityName: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/${entityName}`);
    }

    getRecordById(entityName: string, id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${entityName}/${id}`);
    }

    deleteRecordById(entityName: string, id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${entityName}/${id}`);
    }

    editRecordById(entityName: string, id: string, data: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/${entityName}/${id}`, data);
    }
}
