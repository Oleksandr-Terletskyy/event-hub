import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserAuthResponse, IUsers } from 'src/app/models/users.interface';
import { IndexedDBService } from '../indexedDB/indexed-db.service';
import { LOCALHOST_ENV } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthorized: boolean = false;
  user;
  constructor(public http: HttpClient, private dbService: IndexedDBService) {}
  fetchUsers() {
    return this.http.get<IUsers>(`${LOCALHOST_ENV}/accounts`);
  }

  authUser(params: any) {
    return this.http.post<IUserAuthResponse>(
      `${LOCALHOST_ENV}/sign-in`,
      {},
      { params }
    );
  }

  async logOutUser() {
    this.isAuthorized = false;
    await this.dbService.deleteValue('user', this.user.id);
    this.user = null;
  }
}
