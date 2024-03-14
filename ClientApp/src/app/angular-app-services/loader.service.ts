import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    loadingSubject = new BehaviorSubject<boolean>(false);

    show(): void {
        this.loadingSubject.next(true);
    }

    hide(): void {
        this.loadingSubject.next(false);
    }
}