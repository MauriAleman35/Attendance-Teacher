import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AulasService } from '../../../../services/Aulas.service';
import { ModuloService } from '../../../../services/ModuloService.service';

@Component({
  selector: 'app-aulas-create',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: './Aulas-create.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AulasCreateComponent implements OnInit{ 

 
  form: FormGroup;
  ModuloSelect:any
  

  constructor(private fb: FormBuilder, public AulasService: AulasService,public moduloService:ModuloService) {
    this.form = this.fb.group({
      numero: ['', Validators.required],
      capacidad: ['', Validators.required],
      idModulo: ['', Validators.required]
    });
    
  }

  ngOnInit(): void {
    
    this.ModuloSelect=this.moduloService.modulos()
    console.log(this.ModuloSelect)
   
  }


    
  
  create() {
    if (this.form.valid) {
      const modulo = this.form.value;
      const objCreate = {
        numero: modulo.numero,
        capacidad: parseInt(modulo.capacidad),

        idModulo: modulo.idModulo
      };
      console.log(objCreate); // Verifica los datos a enviar
      this.AulasService.create(objCreate).subscribe({
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
