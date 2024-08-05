// auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Asegúrate de tener la ruta correcta para tu AuthService


export const authGuard:CanActivateFn=(route,state)=>{
    const authService=inject(AuthService);
    const router=inject(Router)
    if(authService.isLoggedIn()){
        return true;
    }else{
        router.navigateByUrl('/login');
        return false;
    }
}