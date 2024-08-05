import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { CarreraService } from '../../../services/Carrera.service';
import { DialogCreateComponent } from './DialogCreate/DialogCreate.component';
import DialogEditComponent from './DialogEdit/DialogEdit.component';


@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [
    CommonModule, CommonModule,MatButtonModule, MatDialogModule,
    MatPaginatorModule,RouterModule,RouterModule,RouterLink
  ],
  templateUrl: './careers.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CareersComponent { 
  public carreraService=inject(CarreraService)
  materias: any[] = this.carreraService.carreras()
  
  
  constructor(public dialog: MatDialog,public dialogEdit: MatDialog) {
    this.carreraService.carreras()
  }
 
  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogEdit(userId:number) {
    console.log('Opening dialog with id:', userId); 
    const dialogRef = this.dialogEdit.open(DialogEditComponent, {
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  onDeleteAdmin(id: number): void {
    this.carreraService.delete(id).subscribe(()=>{
      console.log("ok")
    })
  }
}
