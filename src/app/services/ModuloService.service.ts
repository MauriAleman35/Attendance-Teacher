import { Injectable, computed, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Content, Modulos } from '../interfaces/modulo-req';


interface StateModulo{
  modulos: Content[];
}
@Injectable({
  providedIn: 'root'
})

export class ModuloService {

  private http=inject(HttpClient)
  #state=signal<StateModulo>({

    modulos:[]
  })



  public modulos=computed(()=>this.#state().modulos);
  
 
  constructor() { 

    this.http.get<Modulos>('http://localhost:3000/api/modulo?skip=0&limit=10')
    
    .subscribe((res)=>{
      console.log(res.data.content)
      this.#state.set({
        modulos: res.data.content
        
      })
     
    })


  }


  get(id:number){
    return this.http.get<any>(`http://localhost:3000/api/modulo/${id}`)
  }

  create(modulo:any){
    return this.http.post<any>(`http://localhost:3000/api/modulo/addModulo`,modulo)
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:3000/api/modulo/${id}`)
  }

    update(id:number,carrera:any){
    return this.http.put(`http://localhost:3000/api/modulo/${id}`,carrera)
  }

}
export interface ModuloI {
  id: number;
  numero: string;
  direccion: string;
  // Otros campos según tu API
}