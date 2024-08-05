import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AulasService } from '../../../../services/Aulas.service';
import { ModuloService } from '../../../../services/ModuloService.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aulas-edit',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: './Aulas-edit.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AulasEditComponent { 
  
  Modulo:any
  form: FormGroup;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private aulaService = inject(AulasService);
  private moduloService = inject(ModuloService);

  constructor(
    private fb: FormBuilder,
  ) {
    // Inicializa el formulario vacío
    this.form = this.fb.group({
      numero: ['', Validators.required],
      capacidad: ['', Validators.required],
      idModulo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtiene el id de la ruta
    this.Modulo=this.moduloService.modulos()
    const ModuloId = this.route.snapshot.paramMap.get('id');
    if (ModuloId) {
        // Debug log

      this.aulaService.get(Number(ModuloId)).subscribe({

        next: (aula) => {
          console.log(aula)
          this.form.patchValue({
            numero: aula.numero,
            capacidad: aula.capacidad,
            idModulo: aula.modulo.id
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
      const updatedAula = this.form.value;
      console.log(updatedAula);
      const objEdit={
        numero: updatedAula.numero,
        capacidad: updatedAula.capacidad,
        idModulo: updatedAula.idModulo
      }
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.aulaService.update(Number(userId), objEdit).subscribe({
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
  goBack() {
    window.history.back();
  }
}
