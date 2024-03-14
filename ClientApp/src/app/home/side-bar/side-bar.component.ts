import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MenuService } from 'src/app/angular-app-services/menu.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit, OnDestroy {
  isSidebarToggled = true;
  menuData: any;

  private destroy = new Subject();

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.getMenu()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => {
        this.menuData = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  showSubMenu(event: MouseEvent): void {
    const targetAttr = (event.target as HTMLElement);
    const subMenuItem = (targetAttr.querySelector('.sub-nav-link') as HTMLElement);

    if (subMenuItem) {
      subMenuItem.style.top = targetAttr.getBoundingClientRect().top + 'px';
      subMenuItem.style.left = targetAttr.getBoundingClientRect().width - 2 + 'px';
    }
  }
}
