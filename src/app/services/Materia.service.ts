import { Injectable, computed, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Content, Materia } from '../interfaces/Materia-req';

interface StateAdmin{
  materia: Content[];
}
@Injectable({
  providedIn: 'root'
})

export class MateriasService {
  private http=inject(HttpClient)
  #state=signal<StateAdmin>({

    materia:[]
  })



  public materias=computed(()=>this.#state().materia);
  
 
  constructor() { 

    this.http.get<Materia>('http://localhost:3000/api/materia?skip=0&limit=10')
    
    .subscribe((res)=>{
      console.log(res.data.content)
      this.#state.set({
        materia: res.data.content
        
      })
     
    })


  }


  get(id:number){
    return this.http.get<any>(`http://localhost:3000/api/materia/${id}`)
  }

  create(materia:any){
    return this.http.post<any>(`http://localhost:3000/api/materia/addMateria`,materia)
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:3000/api/materia/${id}`)
  }

  update(id:number,materia:any){
    return this.http.put(`http://localhost:3000/api/materia/${id}`,materia)
  }

}

export interface MateriaI {
  id: number;
  sigla: string;
  nombre: string;
  credito:number
  // Otros campos según tu API
}
