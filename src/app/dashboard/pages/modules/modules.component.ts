import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { ModuloService } from '../../../services/ModuloService.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateComponent } from './dialog-create/dialog-create.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [
    CommonModule,MatIconModule,RouterLink
  ],
  templateUrl: './modules.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ModulesComponent { 

  public moduloService=inject(ModuloService)

  
  
  constructor(public dialog: MatDialog,public dialogEdit: MatDialog) {
    this.moduloService.modulos
  }
 
  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 



  onDeleteAdmin(id: number): void {
    this.moduloService.delete(id).subscribe(()=>{
      console.log("ok")
    })
  }
}
