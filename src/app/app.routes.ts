

import { Routes } from '@angular/router';


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
            children:[
                {
                    path:'careers',
                    title:'Carreras',
                    loadComponent:()=>import('./dashboard/pages/careers/careers.component'),
                },
                {
                    path:'modules',
                    title:'Modulos',
                    loadComponent:()=>import('./dashboard/pages/modules/modules.component'),
                },
                {
                    path:'subjects',
                    title:'Materias',
                    loadComponent:()=>import('./dashboard/pages/subjects/subjects.component'),
                },
                {
                    path:'teachers',
                    title:'Docentes',
                    loadComponent:()=>import('./dashboard/pages/teachers/teachers.component'),
                },
               
               
            ]

       },{
            path:'user',
            loadComponent:()=>import('./user/user.component'),
            children:[
                {
                    path:'programing',
                    title:'Programacion Academica',
                    loadComponent:()=>import('./user/pages/programing-academic/programing-academic.component')

                }, {
                    path:'register-attendance',
                    title:'Registro Asistencia',
                    loadComponent:()=>import('./user/pages/register-attendance/register-attendance.component')

                }, {
                    path:'reports',
                    title:'Reporte Academico',
                    loadComponent:()=>import('./user/pages/reports/reports.component')

                },
            ]
       },
       
       {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
       }



];