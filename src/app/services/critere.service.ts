import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Critere } from '../model/critere';

@Injectable({
  providedIn: 'root'
})
export class CritereService {

  constructor(private http: HttpClient) {}

  public getCriteres(): Observable<any> {
    return this.http.get(environment.backendHost + '/criteres');
  }

  public getCritereById(id:number): Observable<any> {
    return this.http.get(environment.backendHost + `/criteres/${id}`);
  }

  public getActivatedCriteres(): Observable<any> {
    return this.http.get(environment.backendHost + '/Activatedcriteres');
  }

  public addCritere(critere:Critere):Observable<any>
  {
    return this.http.post(environment.backendHost + '/criteres',critere);
  }

  public updateCritere(critere:Critere):Observable<any>
  {
    return this.http.put(environment.backendHost + '/criteres',critere);
  }

  public deleteCritere(id: number): Observable<any> {
    return this.http.delete(environment.backendHost + '/critere/' + id);
  }



}
