import { Injectable, computed, inject, signal } from '@angular/core';
import { Admins, Content, Data } from '../interfaces/Admins-req';
import { HttpClient } from '@angular/common/http';
interface StateAdmin{
  content: Content[];
}
@Injectable({
  providedIn: 'root'
})

export class AdminServiceService {
  private http=inject(HttpClient)
  #state=signal<StateAdmin>({

    content:[]
  })



  public users=computed(()=>this.#state().content);
  
 
  constructor() { 

    this.http.get<Admins>('http://localhost:3000/api/admin?skip=0&limit=10')
    
    .subscribe((res)=>{
      console.log(res.data.content)
      this.#state.set({
        content: res.data.content
        
      })
     
    })


  }


  get(id:number){
    return this.http.get(`http://localhost:3000/api/admin/${id}`)
  }

  create(admins:any){
    return this.http.post<Admins>(`http://localhost:3000/api/admin/addAdmin`,admins)
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:3000/api/admin/${id}`)
  }

  

}
