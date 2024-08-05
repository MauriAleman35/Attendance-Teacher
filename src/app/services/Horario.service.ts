import { Injectable, computed, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Grupos } from '../interfaces/Grupo-req';
import { Horario } from '../interfaces/Horario-req';


interface StateHorario{
 horario: Horario[];
}
@Injectable({
  providedIn: 'root'
})

export class HorarioService {
  private http=inject(HttpClient)
  #state=signal<StateHorario>({

    horario:[]
  })



  public horario=computed(()=>this.#state().horario);
  
 
  constructor() { 

    this.http.get<any>('http://localhost:3000/api/horario')
    
    .subscribe((res)=>{
      console.log(res)
      this.#state.set({
        horario: res
        
      })
     
    })


  }


  get(id:number){
    return this.http.get<Horario>(`http://localhost:3000/api/horario/${id}`)
  }

  create(horario:any){
    return this.http.post<any>(`http://localhost:3000/api/horario/addHorario`,horario)
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:3000/api/horario/${id}`)
  }

  update(id:number,horario:any){
    return this.http.put(`http://localhost:3000/api/horario/${id}`,horario)
  }

}