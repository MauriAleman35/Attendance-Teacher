import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-register-attendance',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './register-attendance.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class RegisterAttendanceComponent { }
