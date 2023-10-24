import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './shared/dialog/dialog.component';
import { DropdownDirective } from './shared/dropdown/dropdown.directive';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { IndexedDBService } from './services/indexedDB/indexed-db.service';
import { LazyLoadingDirective } from './shared/lazy-loading/lazy-loading.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomePageComponent,
    DropdownDirective,
    DialogComponent,
    NotificationsPageComponent,
    StatisticsPageComponent,
    EventPageComponent,
    LazyLoadingDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [IndexedDBService],
      useFactory: (IndexedDBService) => IndexedDBService.initializeApp(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
