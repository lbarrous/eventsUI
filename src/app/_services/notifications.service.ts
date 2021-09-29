import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable()
export class NotificationsService {

    constructor(private socket: Socket) {}

    getNotifications() {
      return this.socket.fromEvent('notifyEvents').pipe((data) => data);
    }

    attachNotifications(userId: string) {
      this.socket.emit("notifications", userId);
    }
}