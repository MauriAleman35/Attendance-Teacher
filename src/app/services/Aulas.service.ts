import { Injectable, computed, inject, signal } from '@angular/core';
import { Aulas } from '../interfaces/Aulas-req';
import { HttpClient } from '@angular/common/http';
interface StateAulas{
  aulas: Aulas[];
}
@Injectable({
  providedIn: 'root'
})
export class AulasService {

  private http=inject(HttpClient)
  #state=signal<StateAulas>({

    aulas:[]
  })



  public aulas=computed(()=>this.#state().aulas);
  
 
  constructor() { 

    this.http.get<any>('http://localhost:3000/api/aula')
    
    .subscribe((res)=>{
      console.log(res)
      this.#state.set({
        aulas: res
        
      })
     
    })


  }


  get(id:number){
    return this.http.get<any>(`http://localhost:3000/api/aula/${id}`)
  }

  create(aula:any){
    return this.http.post<any>(`http://localhost:3000/api/aula/addAula`,aula)
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:3000/api/aula/${id}`)
  }

  update(id:number,aula:any){
    return this.http.put(`http://localhost:3000/api/aula/${id}`,aula)
  }


}
