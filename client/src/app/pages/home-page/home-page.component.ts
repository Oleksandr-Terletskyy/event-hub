import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IEvent } from 'src/app/models/events.interface';
import { tap } from 'rxjs';
import { convertDate } from 'src/app/utils/date';
import { IndexedDBService } from 'src/app/services/indexedDB/indexed-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private eventsService: EventsService,
    private dbService: IndexedDBService,
    private router: Router
  ) {}
  events$ = new BehaviorSubject<IEvent[]>([]);
  offset: number = 0;
  limit: number = 9;
  totalEventsCount;
  currentEventsCount!: number;

  ngOnInit(): void {
    this.checkEvents(this.offset, this.limit);
  }

  async checkEvents(offset, limit) {
    const params = {
      offset,
      limit,
    };
    this.totalEventsCount = await this.dbService.getAllValues(
      'eventsTotalCount'
    );
    this.currentEventsCount = (
      await this.dbService.getAllValues('events')
    ).length;
    if (!this.totalEventsCount.length) {
      this.eventsService.fetchEvents(params).subscribe(async (res) => {
        await this.dbService.addValue('eventsTotalCount', { count: res.total });
        this.totalEventsCount = res.total;
      });
    } else {
      const eventsTotal = await this.dbService.getAllValues('eventsTotalCount');
      this.totalEventsCount = eventsTotal[0].count;
    }

    this.totalEventsCount !== this.currentEventsCount
      ? this.dbService.clearCollection('events')
      : null;
    this.getEvents();
  }

  getEvents(): void {
    if (this.totalEventsCount === this.currentEventsCount) {
      this.getEventsFromIndexedDB(this.offset, this.limit);
    } else {
      this.getEventsFromApi(this.offset, this.limit);
    }
  }

  async getEventsFromIndexedDB(offset, limit) {
    const currentEvents = this.events$.getValue();
    const newEvents = new BehaviorSubject<IEvent[]>([]);
    await this.dbService.getAllValues('events').then((res) => {
      newEvents.next(res.slice(offset, limit));
      this.events$.next([...currentEvents, ...newEvents.getValue()]);
    });
  }

  async getEventsFromApi(offset, limit) {
    const params = {
      offset,
      limit,
    };
    const currentEvents = this.events$.getValue();
    const newEvents = new BehaviorSubject<IEvent[]>([]);
    this.eventsService
      .fetchEvents(params)
      .pipe(
        tap((res) => {
          if (res.data) {
            newEvents.next(res.data);
            this.events$.next([...currentEvents, ...newEvents.getValue()]);
            res.data.forEach(async (val) => {
              await this.dbService.addValue('events', val);
            });
          }
        })
      )
      .subscribe();
  }

  fetchTotal(params) {
    this.eventsService.fetchEvents(params).subscribe((res) => {
      return res.total;
    });
  }

  convertDate(value) {
    return convertDate(value);
  }

  observerAction(): void {
    if (this.events$.value.length < this.totalEventsCount) {
      this.limit += 9;
      this.offset += 9;
      this.getEvents();
    }
  }

  openEvent(event): void {
    this.router.navigate([`/event/${event.id}`]);
  }
}
