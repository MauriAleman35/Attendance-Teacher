import { Injectable, computed, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Grupos } from '../interfaces/Grupo-req';
import { Dias, Horario } from '../interfaces/Horario-req';


interface StateDias{
 dias: Dias[];
}
@Injectable({
  providedIn: 'root'
})

export class DiasService {
  private http=inject(HttpClient)
  #state=signal<StateDias>({

    dias:[]
  })



  public dias=computed(()=>this.#state().dias);
  
 
  constructor() { 

    this.http.get<any>('http://localhost:3000/api/dias')
    
    .subscribe((res)=>{
      console.log(res)
      this.#state.set({
        dias: res
        
      })
     
    })


  }


}