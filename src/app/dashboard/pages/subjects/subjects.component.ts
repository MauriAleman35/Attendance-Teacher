import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MateriasService } from '../../../services/Materia.service';
import { MatDialog } from '@angular/material/dialog';

import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CarreraService } from '../../../services/Carrera.service';
import DialogEditComponent from './crear-materia/crear-materia.component';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [
    CommonModule,RouterLink,RouterOutlet,DialogEditComponent
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
  public materiasService=inject(MateriasService)
  public router = inject(Router);
  
  
  constructor() {
    this.materiasService.materias
  }
 



  onDeleteAdmin(id: number): void {
    this.materiasService.delete(id).subscribe(()=>{
      console.log("ok")
    })
  }

}
