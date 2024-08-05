import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CarreraService } from '../../../../services/Carrera.service';

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
export class DialogCreateComponent {
  private fb=inject(FormBuilder)
  public carreraService=inject(CarreraService)
  private dialogRef = inject(MatDialogRef<DialogCreateComponent>);
  
  form=this.fb.group({
    nombre:['',[Validators.required]],
    codigo:['',[Validators.required]],
 
  })

  create() {
    if (this.form.valid) {
      const carrera = this.form.value;
      console.log(carrera);
      this.carreraService.create(carrera).subscribe({
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
