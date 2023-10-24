import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, IUserAuthResponse } from 'src/app/models/users.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IndexedDBService } from 'src/app/services/indexedDB/indexed-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dbService: IndexedDBService
  ) {}

  users: IUser[] = [];
  ngOnInit() {
    this.dbService.clearCollection('user');
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.authService.fetchUsers().subscribe((users) => {
      this.users = users.accounts;
    });
  }

  onLoginUser(sessionKey: string) {
    const params = {
      key: sessionKey,
    };
    this.authService
      .authUser(params)
      .subscribe(async (res: IUserAuthResponse) => {
        this.authService.isAuthorized = true;
        await this.dbService.addValue('user', res);
        this.authService.user = res;
        if (this.authService.isAuthorized) {
          this.router.navigate(['/home']);
        }
      });
  }
}
