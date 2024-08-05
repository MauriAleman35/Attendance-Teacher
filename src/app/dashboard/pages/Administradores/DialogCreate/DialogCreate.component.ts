import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import AdministradoresComponent from '../Administradores.component';
import { AdminServiceService } from '../../../../services/AdminService.service';
import { Router } from '@angular/router';
/** @title Campo de formulario simple */ 
@Component({
  selector: 'app-dialog-create',
  standalone: true,
  imports: [
    CommonModule,MatDialogModule, MatButtonModule,
    MatSelectModule,MatFormFieldModule, MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './DialogCreate.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DialogCreateComponent {
  private fb=inject(FormBuilder)
  public adminServiceService=inject(AdminServiceService)
  private dialogRef = inject(MatDialogRef<DialogCreateComponent>);
  
  form=this.fb.group({
    ci:['',[Validators.required]],
    name:['',[Validators.required]],
    phone:['',[Validators.required]],
    email:['',[Validators.required]],
  })

  create() {
    if (this.form.valid) {
      const admin = this.form.value;
      console.log(admin);
      this.adminServiceService.create(admin).subscribe({
        next: () => {
          console.log("Admin created successfully");
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error("Error creating admin:", err);
          // Optionally, handle error and do not close the dialog
          this.dialogRef.close(true);
        }
      });
    }
  }

}
