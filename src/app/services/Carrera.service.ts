import { Injectable, computed, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Carreras, Content } from '../interfaces/Carreras-req';
import { Observable, catchError } from 'rxjs';
import { Carrera } from '../interfaces/Materia-req';
interface StateDocentes{
  carreras: Content[];
}
@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  private http=inject(HttpClient)
  #state=signal<StateDocentes>({

    carreras:[]
  })

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`http://localhost:3000/api/carrera?skip=0&limit=10`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener las carreras:', error);
          throw error; // Propaga el error hacia arriba
        })
      );
  }


  public carreras=computed(()=>this.#state().carreras);
 
  constructor() { 
    this.http.get<Carreras>('http://localhost:3000/api/carrera?skip=0&limit=5')
    .subscribe((res)=>{
   
      this.#state.set({
        carreras:res.data.content
        
      })
     
    })


  }


  get(id:number){
    return this.http.get<CarreraI>(`http://localhost:3000/api/carrera/${id}`)
  }

  create(carrera:any){
    return this.http.post<Carreras>(`http://localhost:3000/api/carrera/addCarrera`,carrera)
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:3000/api/carrera/${id}`)
  }

  update(id:number,carrera:any){
    return this.http.put(`http://localhost:3000/api/carrera/${id}`,carrera)
  }

}
export interface CarreraI {
  id: number;
  nombre: string;
  codigo: string;
  // Otros campos según tu API
}