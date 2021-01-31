import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService) { 
    this.notificationService.getNotificationObservable().subscribe(newNote => {
      this.isNotificationVisible = true;
      this.note = newNote;
    })
  }

  public note = '';
  public isNotificationVisible = false;
  ngOnInit(): void {
  }

  removeNotification = ():void =>{
    this.isNotificationVisible = false;
    this.note = '';
  }

}
