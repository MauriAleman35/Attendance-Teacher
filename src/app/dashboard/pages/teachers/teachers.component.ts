import {AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { DocenteServiceService } from '../../../services/DocenteService.service';
import { MatDialog } from '@angular/material/dialog';

import { DialogEditComponent } from './DialogEdit/DialogEdit.component';
import { CarreraService } from '../../../services/Carrera.service';
import DialogCreateComponent from './DialogCreate/DialogCreate.component';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [
    CommonModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule
  ],
  templateUrl: './teachers.component.html',
  styles: `
  :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TeachersComponent {
  public docenteService=inject(DocenteServiceService)
  public carrera=inject(CarreraService)

  
  
  constructor(public dialog: MatDialog) {
    this.docenteService.users()
  }
 
  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogEdit(userId:number) {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  onDeleteAdmin(id: number): void {
    this.docenteService.delete(id).subscribe(()=>{
      console.log("ok")
    })
  }
 

 }

 
