import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-programing-academic',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './programing-academic.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProgramingAcademicComponent { }
