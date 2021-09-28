import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiURL;

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
