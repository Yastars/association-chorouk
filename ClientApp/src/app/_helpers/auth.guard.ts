import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { AuthService } from '../services/auth.service';


@Injectable ({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authService.userValue;
        console.log({user});
        if (user) {
            return true;
        } else {
            
            this.router.navigate(['/login'], {queryParams: { return: state.url } });
            return false;
        }
    }
}