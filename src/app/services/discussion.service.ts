import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  constructor(private http:HttpClient,
    public authService: AuthService,
    public userService: UserService,) { }


  public getDiscussionById(idSujet:number,username:string): Observable<any> {
    
    return this.http.get(environment.backendHost + `/disussions/${idSujet}/${username}`);
  }

  public getAllDiscussion(): Observable<any> {
    
    return this.http.get(environment.backendHost + `/discussions`);
  }
}
