import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { Event } from '../types/Event';
import { EventsService } from '../_services/event.service';
import { TokenStorageService } from '../_services/token-storage.service';
import formatDate from '../_helpers/date.utils';

const SUBSCRIPTION_SUCCESS_MESSAGE = 'Subscription made successfully';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  events?: Event[];
  isLoggedIn = false;
  hasError = false;
  errorMessage = '';

  options = {
    autoClose: false,
    keepAfterRouteChange: false,
  };

  constructor(
    private eventService: EventsService,
    private tokenStorage: TokenStorageService,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = JSON.parse(data);
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

  subscribeToEvent(eventId: string): void {
    this.eventService.subscribeToEvent(eventId).subscribe(
      (data) => {
        this.alertService.success(SUBSCRIPTION_SUCCESS_MESSAGE, this.options);
      },
      (err) => {
        this.hasError = true;
        this.errorMessage = err.error;
        this.alertService.error(
          this.errorMessage ? this.errorMessage : 'Error',
          this.options
        );
      }
    );
  }
}
