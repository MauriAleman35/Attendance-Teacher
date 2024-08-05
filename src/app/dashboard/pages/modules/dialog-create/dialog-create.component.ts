import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModuloService } from '../../../../services/ModuloService.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: './dialog-create.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCreateComponent {

  private fb=inject(FormBuilder)
  public modulosService=inject(ModuloService)
  private dialogRef = inject(MatDialogRef<DialogCreateComponent>);
  
  form=this.fb.group({
    numero:['',[Validators.required]],
    direccion:['',[Validators.required]],
 
  })

  create() {
    if (this.form.valid) {
      const modulo = this.form.value;
      const objCreate={
        numero:modulo.numero,
        direccion:modulo.direccion,
        idFacultad:1
      }
  
      this.modulosService.create(objCreate).subscribe({
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
