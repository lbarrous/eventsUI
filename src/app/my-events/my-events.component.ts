import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';
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

  userEvents?: Event[];
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
        this.userEvents = data;
        console.log("🚀 ~ file: my-events.component.ts ~ line 31 ~ MyEventsComponent ~ ngOnInit ~ this.userEvents", this.userEvents)
        this.totalSubscriptions = this.userEvents?.length;
        console.log("🚀 ~ file: my-events.component.ts ~ line 33 ~ MyEventsComponent ~ ngOnInit ~ this.totalSubscriptions", this.totalSubscriptions)
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
