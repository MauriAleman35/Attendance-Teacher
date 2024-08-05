import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarreraService } from '../../../../services/Carrera.service';

@Component({
  selector: 'app-dialog-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './DialogEdit.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogEditComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carreraService: CarreraService,
    public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number } // Define la estructura esperada
  ) {
    console.log('Data recibida en DialogEditComponent:', this.data);

    // Inicializa el formulario vacío
    this.form = this.fb.group({
      nombre: [''],
      codigo: [''],
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      const userId = this.data.id;
      console.log('Parsed userId:', userId);  // Debug log

      this.carreraService.get(userId).subscribe({
        next: (carrera) => {
          console.log('Carrera obtenida:', carrera);
          this.form.patchValue({
            nombre: carrera.nombre,
            codigo: carrera.codigo
          });
        },
        error: (error) => {
          console.error('Error al cargar los datos de la carrera:', error);
        }
      });
    } else {
      console.error('No se recibió ningún dato o id en MAT_DIALOG_DATA.');
    }
  }

  edit(): void {
    if (this.form.valid) {
      const updatedCarrera = this.form.value;
      this.carreraService.update(this.data.id, updatedCarrera).subscribe(() => {
        this.dialogRef.close(true); // Cierra el diálogo después de actualizar
      }, error => {
        console.error('Error al actualizar la carrera:', error);
      });
    }
  }
}
