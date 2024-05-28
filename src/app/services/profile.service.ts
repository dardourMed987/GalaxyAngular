import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../model/Profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

  public getProfiles(): Observable<any> {
    return this.http.get<Profile[]>(environment.backendHost + '/Profiles');
  }

  public addProfiles(profile: Profile): Observable<any> {

    return this.http.post(
      environment.backendHost + '/Profiles',
      profile
    );
  }

  public deleteProfile(id: number): Observable<any> {
    return this.http.delete(environment.backendHost + '/Profiles/' + id);
  }

  


}
