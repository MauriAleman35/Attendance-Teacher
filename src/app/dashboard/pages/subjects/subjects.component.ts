import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './subjects.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SubjectsComponent { 
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
    
    // Otros usuarios...
  ];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

}
