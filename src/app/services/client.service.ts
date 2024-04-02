import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { client } from '../model/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {}

  public addClient(client: client): Observable<any> {
    return this.http.post(
      environment.backendHost + '/clients',client
    );
  }

  public getClientById(id:number): Observable<any> {
    
    return this.http.get(environment.backendHost + `/clients/${id}`);
  }

  public getAllClient(): Observable<any> {
    
    return this.http.get(environment.backendHost + '/clients');
  }
}
