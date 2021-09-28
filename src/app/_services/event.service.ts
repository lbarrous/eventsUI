import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3081/api/';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get(API_URL + 'events', { responseType: 'text' });
  }

  getEventsByUser(): Observable<any> {
    return this.http.get(API_URL + 'users/subscriptions');
  }

  subscribeToEvent(eventId: string): Observable<any> {
    return this.http.post(
      API_URL + 'events/subscribe' + '/' + eventId,
      {},
      { responseType: 'text' }
    );
  }
}
