import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GruposService } from '../../../../services/Grupos.service';
import { AulasService } from '../../../../services/Aulas.service';
import { DiasService } from '../../../../services/Dia.service';
import { HorarioService } from '../../../../services/Horario.service';

@Component({
  selector: 'app-horario-create',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: './horario-create.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class HorarioCreateComponent {
  
  form: FormGroup;


  Grupo:any
  Aula:any
  Dia:any
  

  constructor(private fb: FormBuilder, public GrupoService: GruposService,
    public aulaService:AulasService,
    public diasService:DiasService,public horariosService:HorarioService
  ) {

    this.form = this.fb.group({
      horarioInicio: ['', Validators.required],
      horarioFin: ['', Validators.required],
      idGrupo: ['', Validators.required],
      idAula: ['', Validators.required],
      idDia: ['', Validators.required]
    });
    
  }

  ngOnInit(): void {
    
    this.Grupo=this.GrupoService.grupos()
    this.Aula=this.aulaService.aulas()
    this.Dia=this.diasService.dias()

   
  }


    
  
  create() {
    if (this.form.valid) {
      const Horario = this.form.value;
      const objCreate = {
        horaInicio: Horario.horarioInicio ,
        horaFin: Horario.horarioFin,
        idGrupo: parseInt(Horario.idGrupo),
        idAula: parseInt(Horario.idAula),
        idDia: parseInt(Horario.idDia)
      };
      console.log(objCreate); // Verifica los datos a enviar
      this.horariosService.create(objCreate).subscribe({
        next: () => {
          window.history.back();
          console.log("Module created successfully");
        },
        error: (err) => {
          console.error("Error creating module:", err);
        }
      });
    }

  }
  goBack() {
    window.history.back();
  }


}
