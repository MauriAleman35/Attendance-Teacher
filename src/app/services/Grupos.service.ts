import { Injectable, computed, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Grupos } from '../interfaces/Grupo-req';


interface StateGrupo{
  grupos: Grupos[];
}
@Injectable({
  providedIn: 'root'
})

export class GruposService {
  private http=inject(HttpClient)
  #state=signal<StateGrupo>({

    grupos:[]
  })



  public grupos=computed(()=>this.#state().grupos);
  
 
  constructor() { 

    this.http.get<any>('http://localhost:3000/api/grupo')
    
    .subscribe((res)=>{
      console.log(res)
      this.#state.set({
        grupos: res
        
      })
     
    })


  }


  get(id:number){
    return this.http.get<any>(`http://localhost:3000/api/grupo/${id}`)
  }

  create(grupo:any){
    return this.http.post<any>(`http://localhost:3000/api/grupo/addGrupo`,grupo)
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:3000/api/grupo/${id}`)
  }

  update(id:number,grupo:any){
    return this.http.put(`http://localhost:3000/api/grupo/${id}`,grupo)
  }

}