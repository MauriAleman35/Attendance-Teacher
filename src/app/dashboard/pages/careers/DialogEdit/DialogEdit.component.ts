import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CarreraService } from '../../../../services/Carrera.service';
import { ActivatedRoute, Router } from '@angular/router';

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
export default class DialogEditComponent implements OnInit {
  form: FormGroup;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private carreraService = inject(CarreraService);

  constructor(
    private fb: FormBuilder,
  ) {
    // Inicializa el formulario vacío
    this.form = this.fb.group({
      nombre: [''],
      codigo: [''],
    });
  }

  ngOnInit(): void {
    // Obtiene el id de la ruta
    
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      console.log('Parsed userId:', userId);  // Debug log

      this.carreraService.get(Number(userId)).subscribe({
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
      console.error('No se recibió ningún id en la ruta.');
    }
  }

  edit(): void {
    if (this.form.valid) {
      const updatedCarrera = this.form.value;
      const objEdit={
        nombre:updatedCarrera.nombre,
        codigo:updatedCarrera.codigo,
        idFacultad:1
      }
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.carreraService.update(Number(userId), objEdit).subscribe({
          next: () => {
            window.history.back(); // Navega hacia atrás en el historial del navegador
        
           // Navega de regreso a la lista después de actualizar
          },
          error: (error) => {
            console.error('Error al actualizar la carrera:', error);
          }
        });
       // Navega hacia atrás en el historial del navegador
       
      }
    }
    
  }
}
