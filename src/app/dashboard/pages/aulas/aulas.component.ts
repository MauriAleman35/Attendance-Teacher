import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AulasService } from '../../../services/Aulas.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-aulas',
  standalone: true,
  imports: [
    CommonModule,RouterLink
  ],
  templateUrl: './aulas.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AulasComponent { 
  public AulaService=inject(AulasService)
  public router = inject(Router);
  
  
  constructor() {
    this.AulaService.aulas
  }
 



  onDeleteAdmin(id: number): void {
    this.AulaService.delete(id).subscribe(()=>{
      console.log("ok")
    })
  }



}
