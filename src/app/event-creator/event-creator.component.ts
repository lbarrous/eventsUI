import { Component, OnInit } from '@angular/core';
import { EventsService } from '../_services/event.service';

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.css']
})
export class EventCreatorComponent implements OnInit {
  form: any = {
    headline: null,
    description: null,
    location: null,
    startDate: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private eventsService: EventsService){
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { headline, description, location, startDate } = this.form;

    this.eventsService.createEvent(headline, description, location, startDate).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error;
        this.isSignUpFailed = true;
      }
    );
  }

}
