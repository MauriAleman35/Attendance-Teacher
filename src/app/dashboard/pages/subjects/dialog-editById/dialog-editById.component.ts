import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ModuloService } from '../../../../services/ModuloService.service';
import { CarreraService } from '../../../../services/Carrera.service';
import { MateriasService } from '../../../../services/Materia.service';

@Component({
  selector: 'app-dialog-edit-by-id',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule,RouterLink
  ],
  templateUrl: './dialog-editById.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DialogEditByIdComponent { 
  Carreras:any
  form: FormGroup;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private carreraService = inject(CarreraService);
  private materiaService = inject(MateriasService);

  constructor(
    private fb: FormBuilder,
  ) {
    // Inicializa el formulario vacío
    this.form = this.fb.group({
      sigla: ['', Validators.required],
      name: ['', Validators.required],
      credito: ['', Validators.required],
      idCarrera: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtiene el id de la ruta
    this.Carreras=this.carreraService.carreras();
    const ModuloId = this.route.snapshot.paramMap.get('id');
    if (ModuloId) {
        // Debug log

      this.materiaService.get(Number(ModuloId)).subscribe({

        next: (modulo) => {
          console.log(modulo.carrera.nombre)
          this.form.patchValue({
            sigla:  modulo.sigla ,
            name: modulo.nombre,
            credito: modulo.credito,
            idCarrera:modulo.carrera.id
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
        sigla: updatedModulo.name,
        name: updatedModulo.sigla,
        credito: parseInt(updatedModulo.credito), // Asegúrate de convertir a número si es necesario
        idCarrera: updatedModulo.idCarrera
      }
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.materiaService.update(Number(userId), objEdit).subscribe({
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
