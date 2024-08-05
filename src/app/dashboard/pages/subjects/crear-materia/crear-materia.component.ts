import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CarreraService } from '../../../../services/Carrera.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MateriasService } from '../../../../services/Materia.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-crear-materia',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule,MatFormFieldModule,MatSelectModule
  ],
  
  templateUrl: './crear-materia.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CrearMateriaComponent implements OnInit {
  
  form: FormGroup;
  Carreras:any
  

  constructor(private fb: FormBuilder, private apiService: CarreraService,public materiService:MateriasService) {
    this.form = this.fb.group({
      sigla: ['', Validators.required],
      name: ['', Validators.required],
      credito: ['', Validators.required],
      idCarrera: ['', Validators.required]
    });
    
  }

  ngOnInit(): void {
    
    this.Carreras=this.apiService.carreras();
    console.log(this.Carreras)
   
  }


    
  
  create() {
    if (this.form.valid) {
      const modulo = this.form.value;
      const objCreate = {
        sigla: modulo.name,
        name: modulo.sigla,
        credito: parseInt(modulo.credito), // Asegúrate de convertir a número si es necesario
        idCarrera: modulo.idCarrera
      };
      console.log(objCreate); // Verifica los datos a enviar
      this.materiService.create(objCreate).subscribe({
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
