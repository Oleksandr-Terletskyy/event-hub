import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { IUserAuthResponse } from 'src/app/models/users.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IndexedDBService } from 'src/app/services/indexedDB/indexed-db.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: IUserAuthResponse | null = null;
  constructor(
    public authService: AuthService,
    public dialog: Dialog,
    private dbService: IndexedDBService
  ) {}
  ngOnInit(): void {
    this.getUserData();
  }

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

  async getUserData() {
    this.user = await this.dbService.getAllValues('user').then((res) => res[0]);
  }
}
