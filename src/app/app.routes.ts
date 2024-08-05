

import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';



export const routes: Routes = [

        {
            path:'login',
            loadComponent:()=>import('./auth/login/login.component')
        },
        {
            path:'logout',
            loadComponent:()=>import('./auth/auth/auth.component')
        },
         {
            path:'admin',
            loadComponent:()=>import('./dashboard/dashboard.component'),
            canActivate: [authGuard],
            children:[
                {
                    path:'Administradores',
                    title:'Administradores',
                    loadComponent:()=>import('./dashboard/pages/Administradores/Administradores.component'),
                    

                },
              
                {
                    path:'teachers',
                    title:'Docentes',
                    loadComponent:()=>import('./dashboard/pages/teachers/teachers.component'),
                },
                {
                    path:'careers',
                    title:'Carreras',
                    loadComponent:()=>import('./dashboard/pages/careers/careers.component'),
                },
                {
                    path:'careers/:id',
                    loadComponent:()=>import('./dashboard/pages/careers/DialogEdit/DialogEdit.component')
                },
                {
                    path:'modules',
                    title:'Modulos',
                    loadComponent:()=>import('./dashboard/pages/modules/modules.component'),
                },
                {
                  
                    path:'modules/:id',
                    loadComponent:()=>import('./dashboard/pages/modules/dialog-edit/dialog-edit.component'),
                },
                {
                    path:'subjects',
                    title:'Materias',
                    loadComponent:()=>import('./dashboard/pages/subjects/subjects.component'),
                },
                {
                    path:'subjects/add',
                    loadComponent:()=>import('./dashboard/pages/subjects/crear-materia/crear-materia.component'),
                },
                {
                    path:'subjects/:id',
                    loadComponent:()=>import('./dashboard/pages/subjects/dialog-editById/dialog-editById.component'),
                   
                },
                
                {
                    path:'Aulas',
                    title:'Aulas',
                    loadComponent:()=>import('./dashboard/pages/aulas/aulas.component'),
                },
                {
                    path:'Aulas/add',
                
                    loadComponent:()=>import('./dashboard/pages/aulas/Aulas-create/Aulas-create.component'),
                },
                {
                    path:'Aulas/:id',
               
                    loadComponent:()=>import('./dashboard/pages/aulas/Aulas-edit/Aulas-edit.component'),
                },
               

                {
                    path:'Grupos',
                    title:'Grupos',
                    loadComponent:()=>import('./dashboard/pages/grupos/grupos.component'),
                },
                {
                    path:'Grupos/add',
                    loadComponent:()=>import('./dashboard/pages/grupos/Grupo-create/Grupo-create.component'),
                },
               
                {
                    path:'Grupos/:id',
                    loadComponent:()=>import('./dashboard/pages/grupos/Grupo-edit/Grupo-edit.component'),
                },
               
                {
                    path:'horario',
                    title:'Horario',
                    loadComponent:()=>import('./dashboard/pages/Horarios/Horarios.component'),
                },
                {
                    path:'horario/add',
             
                    loadComponent:()=>import('./dashboard/pages/Horarios/horario-create/horario-create.component'),
                },
                {
                    path:'horario/:id',
                    loadComponent:()=>import('./dashboard/pages/Horarios/horario-edit/horario-edit.component'),
                },
                {
                    path:'solicitudes',
                    title:'Solicitudes',
                    loadComponent:()=>import('./dashboard/pages/Solicitudes/Solicitudes.component'),
                },
                {
                    path:'solicitudes/aceptadas',
            
                    loadComponent:()=>import('./dashboard/pages/Solicitudes/soli-aceptados/soli-aceptados.component'),
                },
               
            ]

       },
       
       {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
       }



];