import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SolicitudService } from '../../../services/Solicitudes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [
    CommonModule,MatButtonToggleModule
  ],
  templateUrl: './Solicitudes.component.html',
  styles: `
       
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SolicitudesComponent {

  public solicitudService=inject(SolicitudService)
  public router = inject(Router);
  
  
  constructor() {
    
  }
 
  get solicitudesAceptadas() {
    return this.solicitudService.solicitud().filter(solicitud => solicitud.estado === false);
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
      console.log("h")
      this.router.navigate(['/admin/solicitudes/aceptadas']);
    }
  }
 }
