import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { message } from '../model/message';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {}

  public addMessage(message: message): Observable<any> {
    return this.http.post(
      environment.backendHost + '/messages',
      message
    );
  }

  


}
