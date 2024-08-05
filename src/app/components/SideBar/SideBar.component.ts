import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';


import { ProfileMenuComponent } from '../profile.menu/profile.menu.component';
import { routes } from '../../app.routes';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,RouterModule,ProfileMenuComponent,RouterModule,MatIconModule
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

  constructor(public auth:AuthService,private router: Router){}
    
  public adminRoutes = routes.find(route => route.path === 'admin')?.children ?? [];

// Filtrar rutas que no contengan ':id' ni '/add'
public MenuItems = this.adminRoutes.filter(route =>
  route.path && !route.path.includes(':id') && !route.path.includes('/add') && !route.path.includes('/aceptadas')
);

  Logout():void{
    this.auth.logout();
    this.router.navigate(['/']);
  }

  getNameUser():string{
    return localStorage.getItem('UserLogeado') || "";
  }
}
