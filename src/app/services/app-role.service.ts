import { AppRole } from './../model/app-role';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppRoleService {
  constructor(private http: HttpClient) {}

  public getAppRoles(): Observable<any> {
    return this.http.get(environment.backendHost + '/appRoles');
  }
  public addAppRole(appRole: AppRole): Observable<any> {
    return this.http.post(environment.backendHost + '/appRoles', appRole);
  }
  public deleteAppRole(role: string): Observable<any> {
    return this.http.delete(environment.backendHost + '/appRoles/' + role);
  }
}
