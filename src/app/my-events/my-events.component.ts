import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { Event } from '../types/Event';
import formatDate from '../_helpers/date.utils';
import { EventsService } from '../_services/event.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css'],
})
export class MyEventsComponent implements OnInit {
  options = {
    autoClose: false,
    keepAfterRouteChange: false,
  };

  events?: Event[];
  totalSubscriptions: number = 0;
  hasError = false;
  errorMessage = '';

  constructor(
    private eventService: EventsService,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.eventService.getEventsByUser().subscribe(
      (data) => {
        this.events = data;
        // @ts-ignore
        this.totalSubscriptions = this.events?.length;
      },
      (err) => {
        this.hasError = true;
        this.errorMessage = err.ok ? err.error : 'Error';
        this.alertService.error(
          this.errorMessage ? this.errorMessage : 'Error',
          this.options
        );
      }
    );
  }

  formatDate(date: string) {
    return formatDate(date);
  }
}
