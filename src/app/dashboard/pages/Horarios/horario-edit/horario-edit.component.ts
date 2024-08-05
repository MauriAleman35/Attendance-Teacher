import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiasService } from '../../../../services/Dia.service';
import { AulasService } from '../../../../services/Aulas.service';
import { GruposService } from '../../../../services/Grupos.service';
import { DocenteServiceService } from '../../../../services/DocenteService.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HorarioService } from '../../../../services/Horario.service';


@Component({
  selector: 'app-horario-edit',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule,MatFormFieldModule,MatDatepickerModule,FormsModule
  ],
  templateUrl: './horario-edit.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HorarioEditComponent implements OnInit { 

  GrupoSe:any
  AulaSe:any
  Dia:any
  form: FormGroup;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private AulaService = inject(AulasService);
  private GrupoService = inject(GruposService);
  private horarioService = inject(HorarioService);
  private diasService=inject(DiasService)
  constructor(
    private fb: FormBuilder,
  ) {
    // Inicializa el formulario vacío
    this.form = this.fb.group({
      horarioInicio: ['', Validators.required],
      horarioFin: ['', Validators.required],
      idGrupo: ['', Validators.required],
      idAula: ['', Validators.required],
      idDia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtiene el id de la ruta
    this.GrupoSe=this.GrupoService.grupos()
    this.AulaSe=this.AulaService.aulas()
    this.Dia=this.diasService.dias()
    const HorarioId = this.route.snapshot.paramMap.get('id');
    if (HorarioId) {
        // Debug log

      this.horarioService.get(Number(HorarioId)).subscribe({

        next: (horario) => {
          console.log(horario)
          this.form.patchValue({
            horarioInicio: horario.horaInicio,
            horarioFin: horario.horaFinal,
            idGrupo: horario.grupo.id,
            idAula: horario.aula.id,
            idDia: horario.dias.id
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
          horarioInicio: updatedGrupo.horarioInicio,
            horarioFin:updatedGrupo.horarioFin,
            idGrupo:parseInt( updatedGrupo.idGrupo),
            idAula: parseInt(updatedGrupo.idAula),
            idDia:parseInt(updatedGrupo.idDia)
      }
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.horarioService.update(Number(userId), objEdit).subscribe({
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
