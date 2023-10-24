import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { AuthResolver } from './shared/auth/auth.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    resolve: { data: AuthResolver },
  },
  {
    path: 'home',
    component: HomePageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    component: NotificationsPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'event/:id',
    component: EventPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    children: [],
  },
  {
    path: 'statistics',
    component: StatisticsPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '/404', data: { title: 'Page Not Found' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
