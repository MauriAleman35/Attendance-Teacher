import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GruposService } from '../../../services/Grupos.service';
import { MateriasService } from '../../../services/Materia.service';
import { DocenteServiceService } from '../../../services/DocenteService.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [
    CommonModule,RouterLink
  ],
  templateUrl: './grupos.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GruposComponent {
  

  public GrupoService=inject(GruposService)
  public MateriaService = inject(MateriasService);
  public DocenteService = inject(DocenteServiceService);
  
  
  constructor() {
    this.GrupoService.grupos
  }
 



  onDeleteAdmin(id: number): void {
    this.GrupoService.delete(id).subscribe(()=>{
      console.log("ok")
    })
  }

}
