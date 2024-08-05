import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AdminServiceService } from '../../../services/AdminService.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink, RouterModule } from '@angular/router';
import DialogCreateComponent from './DialogCreate/DialogCreate.component';


@Component({
  selector: 'app-administradores',
  standalone: true,
  imports: [
    CommonModule,MatButtonModule, MatDialogModule,MatPaginatorModule,RouterModule,RouterModule
    ,RouterLink
  ],
  templateUrl: './Administradores.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdministradoresComponent  { 

  public adminServiceService=inject(AdminServiceService)

  
  
  constructor(public dialog: MatDialog) {
    this.adminServiceService.users()
  }
 
  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 



  onDeleteAdmin(id: number): void {
    this.adminServiceService.delete(id).subscribe(()=>{
      console.log("ok")
    })
  }
}

