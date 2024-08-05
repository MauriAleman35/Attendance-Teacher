import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HorarioService } from '../../../services/Horario.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [
    CommonModule,RouterLink
  ],
  templateUrl: './Horarios.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class HorariosComponent {
    
  public horarioService=inject(HorarioService)

  
  
  constructor() {
    this.horarioService.horario
  }
 



  onDeleteAdmin(id: number): void {
    this.horarioService.delete(id).subscribe(()=>{
      console.log("ok")
    })
  }




}
