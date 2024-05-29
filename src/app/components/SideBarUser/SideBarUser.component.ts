import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProfileMenuComponent } from '../profile.menu/profile.menu.component';

@Component({
  selector: 'app-side-bar-user',
  standalone: true,
  imports: [
    CommonModule,RouterModule,MatIconModule,ProfileMenuComponent
  ],
  templateUrl: './SideBarUser.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarUserComponent { 
  public userRoutes = routes.find(route => route.path === 'user')?.children ?? [];
  public userMenuItems = this.userRoutes.filter(route => route.path && !route.path.includes(':'));
 
 
}
