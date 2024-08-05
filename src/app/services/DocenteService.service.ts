import { Injectable, computed, inject, signal } from '@angular/core';
import { Content, Docentes } from '../interfaces/Docentes-req';
import { HttpClient } from '@angular/common/http';
interface StateDocentes{
  docentes: Content[];
}
@Injectable({
  providedIn: 'root'
})
export class DocenteServiceService {

  private http=inject(HttpClient)
  #state=signal<StateDocentes>({

    docentes:[]
  })



  public users=computed(()=>this.#state().docentes);
 
  constructor() { 
    this.http.get<any>('http://localhost:3000/api/docente?skip=0&limit=5')
    .subscribe((res)=>{
   
      this.#state.set({
        docentes: res.data.content
        
      })
     
    })


  }


  get(id:number){
    return this.http.get(`http://localhost:3000/api/docente/${id}`)
  }

  create(admins:any){
    return this.http.post<Docentes>(`http://localhost:3000/api/docente/addDocente`,admins)
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:3000/api/docente/${id}`)
  }


}
