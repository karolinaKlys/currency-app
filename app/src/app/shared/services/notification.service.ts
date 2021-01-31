import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notificationSubject = new Subject<string>();

  constructor() { }

  addNewNotification = (note: string): void => {
    this._notificationSubject.next(note);
  }

  getNotificationObservable = (): Observable<string> => {
    return this._notificationSubject.asObservable();
  }
}
