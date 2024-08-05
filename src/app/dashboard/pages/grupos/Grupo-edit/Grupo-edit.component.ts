import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AulasService } from '../../../../services/Aulas.service';
import { GruposService } from '../../../../services/Grupos.service';
import { DocenteServiceService } from '../../../../services/DocenteService.service';
import { MateriasService } from '../../../../services/Materia.service';

@Component({
  selector: 'app-grupo-edit',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: './Grupo-edit.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GrupoEditComponent {
  Materia:any
  Docente:any
  form: FormGroup;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private materiaService = inject(MateriasService);
  private GrupoService = inject(GruposService);
  private docenteService = inject(DocenteServiceService);

  constructor(
    private fb: FormBuilder,
  ) {
    // Inicializa el formulario vacío
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      periodo: ['', Validators.required],
      idDocente: ['', Validators.required],
      idMateria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtiene el id de la ruta
    this.Materia=this.materiaService.materias()
    this.Docente=this.docenteService.users()
    const GrupoId = this.route.snapshot.paramMap.get('id');
    if (GrupoId) {
        // Debug log

      this.GrupoService.get(Number(GrupoId)).subscribe({

        next: (grupo) => {
          console.log(grupo)
          this.form.patchValue({
            nombre: grupo.nombre,
            periodo: grupo.periodo,
            idDocente: grupo.docente.id,
            idMateria: grupo.materia.id
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
      const updatedGrupo = this.form.value;
      console.log(updatedGrupo);
      const objEdit={
        nombre: updatedGrupo.nombre,
        periodo: updatedGrupo.periodo,
        idDocente: parseInt(updatedGrupo.idDocente),
        idMateria: parseInt(updatedGrupo.idMateria)
      }
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.GrupoService.update(Number(userId), objEdit).subscribe({
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
