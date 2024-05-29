import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [
    CommonModule,MatIconModule
  ],
  templateUrl: './modules.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ModulesComponent { 

  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
    
    // Otros usuarios...
  ];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
}
