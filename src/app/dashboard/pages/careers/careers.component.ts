import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [
    CommonModule,MatTableModule
  ],
  templateUrl: './careers.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CareersComponent { 
   users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
    
    // Otros usuarios...
  ];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
}
