import { Injectable, computed, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Grupos } from '../interfaces/Grupo-req';
import { Horario } from '../interfaces/Horario-req';
import { Solicitud } from '../interfaces/soli-req';


interface StateHorario{
 solicitud: Solicitud[];
}
@Injectable({
  providedIn: 'root'
})

export class SolicitudService {
  private http=inject(HttpClient)
  #state=signal<StateHorario>({

    solicitud:[]
  })



  public solicitud=computed(()=>this.#state().solicitud);
  
 
  constructor() { 

    this.http.get<any>('http://localhost:3000/api/solicitud')
    
    .subscribe((res)=>{
      console.log(res)
      this.#state.set({
        solicitud: res
        
      })
     
    })


  }


  get(id:number){
    return this.http.get<Horario>(`http://localhost:3000/api/solicitud/${id}`)
  }

 
  delete(id:number){
    return this.http.delete<any>(`http://localhost:3000/api/solicitud/${id}`)
  }

  aceptar(id: number) {
    const body = {}; // o cualquier otra información que necesites enviar
    return this.http.put(`http://localhost:3000/api/solicitud/${id}/estado?estado=true`, body);
  }

}