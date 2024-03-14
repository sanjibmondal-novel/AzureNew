import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TooltipService {

    isTooltipDisabled(element: HTMLElement): boolean {
        return element.scrollWidth <= element.clientWidth;
    }
}