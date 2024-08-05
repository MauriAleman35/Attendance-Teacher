import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GruposService } from '../../../../services/Grupos.service';
import { MateriasService } from '../../../../services/Materia.service';
import { DocenteServiceService } from '../../../../services/DocenteService.service';

@Component({
  selector: 'app-grupo-create',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: './Grupo-create.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export default class GrupoCreateComponent implements OnInit{

  form: FormGroup;
  MateriaSelect:any
  DocenteSelect:any
  

  constructor(private fb: FormBuilder, public GrupoService: GruposService,public materiaService:MateriasService,
    public docenteService:DocenteServiceService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      periodo: ['', Validators.required],
      idDocente: ['', Validators.required],
      idMateria: ['', Validators.required]
    });
    
  }

  ngOnInit(): void {
    
    this.MateriaSelect=this.materiaService.materias()
    this.DocenteSelect=this.docenteService.users()

   
  }


    
  
  create() {
    if (this.form.valid) {
      const Grupo = this.form.value;
      const objCreate = {
        nombre:Grupo.nombre,
        periodo: Grupo.periodo,
        idDocente: Grupo.idDocente,
        idMateria:Grupo.idMateria
      };
      console.log(objCreate); // Verifica los datos a enviar
      this.GrupoService.create(objCreate).subscribe({
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
