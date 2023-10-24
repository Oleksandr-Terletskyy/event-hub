import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IndexedDBService } from 'src/app/services/indexedDB/indexed-db.service';
import { convertDate } from 'src/app/utils/date';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
})
export class EventPageComponent implements OnInit {
  @ViewChild('calendarDays') calendarDays!: ElementRef;
  @ViewChild('dayss') dayss!: ElementRef;

  event;
  calendarOpen: boolean = false;
  currentDate;
  date;
  days: number[] = [];
  firstDayofMonth: number[] = [];
  lastDayofMonth: number[] = [];
  startDate: number = 0;
  endDate: number = 0;

  constructor(
    private route: ActivatedRoute,
    private dbService: IndexedDBService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getEvent(+params['id']);
    });
  }

  async getEvent(eventId: number) {
    this.event = await this.dbService.get('events', eventId);
    this.date = this.convertDate(this.event.dates);
  }

  rendCalendar(): void {
    this.calendarOpen = !this.calendarOpen;
    this.days = [];
    this.lastDayofMonth = [];
    this.firstDayofMonth = [];

    const prevNextIcon: NodeListOf<Element> =
      document.querySelectorAll('.icons span')!;

    let date = new Date(),
      currYear = date.getFullYear(),
      currMonth = date.getMonth();

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const renderCalendar = () => {
      let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(
          currYear,
          currMonth,
          lastDateofMonth
        ).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

      for (let i = firstDayofMonth; i > 0; i--) {
        this.firstDayofMonth.push(lastDateofLastMonth - i + 1);
      }

      for (let i = 1; i <= lastDateofMonth; i++) {
        this.days.push(i);
      }

      for (let i = lastDayofMonth; i < 6; i++) {
        this.lastDayofMonth.push(i - lastDayofMonth + 1);
      }
      this.currentDate = `${months[currMonth]} ${currYear}`;

      let fields = this.date.split('-');
      let startDate = fields[0].trim().slice(0, 2);
      let endDate = fields[1].trim().slice(0, 2);
      this.startDate = +startDate;
      this.endDate = endDate;
    };

    renderCalendar();

    prevNextIcon.forEach((icon) => {
      icon.addEventListener('click', () => {
        this.days = [];
        this.lastDayofMonth = [];
        this.firstDayofMonth = [];
        currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
          date = new Date(currYear, currMonth);
          currYear = date.getFullYear();
          currMonth = date.getMonth();
        } else {
          date = new Date();
        }
        renderCalendar();
      });
    });
  }

  convertDate(value) {
    return convertDate(value);
  }
}
