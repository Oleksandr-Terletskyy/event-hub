import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IndexedDBService } from 'src/app/services/indexedDB/indexed-db.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthResolver implements Resolve<boolean> {
  constructor(
    private authService: AuthService,
    private dbService: IndexedDBService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (this.authService.isAuthorized) {
      this.authService.logOutUser();
    }
    return of(true);
  }
}
