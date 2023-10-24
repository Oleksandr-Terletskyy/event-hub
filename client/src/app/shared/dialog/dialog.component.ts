import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public dialog: Dialog,
    @Inject(DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialog.closeAll();
  }

  onLogoutClick(): void {
    this.dialog.closeAll();
    this.authService.logOutUser();
    this.router.navigate(['login']);
  }
}
