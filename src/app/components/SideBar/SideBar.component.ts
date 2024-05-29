import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import { ProfileMenuComponent } from '../profile.menu/profile.menu.component';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,RouterModule,MatIconModule,ProfileMenuComponent
  ],
  templateUrl: './SideBar.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export default  class SideBarComponent {

 

    // public MenuItems=routes.map(route=>route.children ?? [])
    // .flat().filter(route=> route && route.path).filter((route)=>!route.path?.includes(':') );
    public adminRoutes = routes.find(route => route.path === 'admin')?.children ?? [];
    public MenuItems= this.adminRoutes.filter(route => route.path && !route.path.includes(':'));

}
