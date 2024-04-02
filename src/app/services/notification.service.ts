import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { avis } from '../model/avis';
import { environment } from 'src/environments/environment';
import { notification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private actualisationSubject = new Subject<void>();

  actualisationObservable$: Observable<void> = this.actualisationSubject.asObservable();

  actualiser() {
    this.actualisationSubject.next();
  }

  constructor(private http: HttpClient)
   {
    
   }

  public addNotification(notification: notification): Observable<any> {
    return this.http.post(
      environment.backendHost + '/notifications',
      notification
    );
  }

  public getNotificationsNonTraitees(): Observable<any> {
    return this.http.get<notification[]>(environment.backendHost + '/notifications/non-traitées');
  }

  public updateNotification(notification: notification): Observable<any> {
    return this.http.put(environment.backendHost + '/notifications', notification);
  }


  
}
