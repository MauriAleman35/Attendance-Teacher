import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dialog-edit',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './DialogEdit.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogEditComponent { }
