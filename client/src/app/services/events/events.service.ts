import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IeventsRes } from 'src/app/models/events.interface';
import { LOCALHOST_ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  fetchEvents(params): Observable<IeventsRes> {
    return this.http.get<IeventsRes>(`${LOCALHOST_ENV}/events`, { params });
  }

  async getEventsTotalCount(params) {
    this.http
      .get<IeventsRes>(`${LOCALHOST_ENV}/events`, { params })
      .subscribe((res) => {
        return res.total;
      });

    return new Promise<number>((resolve, reject) => {
      this.http
        .get<IeventsRes>(`${LOCALHOST_ENV}/events`, { params })
        .subscribe((res) => {
          resolve(res.total);
        });
    });
  }
}
