import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from '../../../../services/Solicitudes.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-soli-aceptados',
  standalone: true,
  imports: [
    CommonModule,MatButtonToggleModule
  ],
  templateUrl: './soli-aceptados.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SoliAceptadosComponent { 
  public solicitudService=inject(SolicitudService)
  public router = inject(Router);
  
  
  constructor() {
    
  }
 
  get solicitudesAceptadas() {
    return this.solicitudService.solicitud().filter(solicitud => solicitud.estado === true);
  }


  onDeleteAdmin(id: number): void {
    this.solicitudService.delete(id).subscribe(()=>{
      console.log("ok")
    })
  }
  AceptarSoli(id: number): void {
    this.solicitudService.aceptar(id).subscribe(()=>{
      console.log("ok")
    })
  }
  onToggleChange(event: any) {
    const value = event.value;
    if (value === 'pending') {
      this.router.navigate(['/admin/solicitudes']);
    } else if (value === 'accepted') {
      this.router.navigate(['/admin/solicitudes/aceptadas']);
    }
  }

}
