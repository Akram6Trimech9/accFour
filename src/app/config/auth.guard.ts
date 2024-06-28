import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { filter, map, Observable } from "rxjs";
import { CurrentUserService } from "../services/currentUser.service";
 
@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  constructor(private currentUserService: CurrentUserService,   private router: Router) { }
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    
        return this.currentUserService.currentUser$.pipe(
            filter(currentUser => currentUser !== undefined),
            map((currentUser) => {
                if (!currentUser) {
                     return this.router.createUrlTree(['']);
                }
                return true;
            })
        );
    }
  }