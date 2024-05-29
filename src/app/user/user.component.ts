import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarUserComponent } from '../components/SideBarUser/SideBarUser.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    SideBarUserComponent,
  ],
  templateUrl: './user.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserComponent { }
