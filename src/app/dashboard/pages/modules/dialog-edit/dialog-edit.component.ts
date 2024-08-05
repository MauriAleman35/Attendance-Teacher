import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuloI, ModuloService } from '../../../../services/ModuloService.service';

@Component({
  selector: 'app-dialog-edit',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: './dialog-edit.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DialogEditComponent implements OnInit{ 
  form: FormGroup;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private moduloService = inject(ModuloService);

  constructor(
    private fb: FormBuilder,
  ) {
    // Inicializa el formulario vacío
    this.form = this.fb.group({
      numero: [''],
      direccion: [''],
    });
  }

  ngOnInit(): void {
    // Obtiene el id de la ruta
    
    const ModuloId = this.route.snapshot.paramMap.get('id');
    if (ModuloId) {
        // Debug log

      this.moduloService.get(Number(ModuloId)).subscribe({
        next: (modulo) => {
      
          this.form.patchValue({
            numero: modulo.numero,
            direccion: modulo.direccion
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
      const updatedModulo = this.form.value;
      console.log(updatedModulo);
      const objEdit={
        numero:updatedModulo.numero,
        direccion:updatedModulo.direccion,
        idFacultad:1
      }
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.moduloService.update(Number(userId), objEdit).subscribe({
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
