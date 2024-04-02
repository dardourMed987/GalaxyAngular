import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { avis } from '../model/avis';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  constructor(private http: HttpClient) {}

  public addAvis(avis: avis): Observable<any> {
    return this.http.post(
      environment.backendHost + '/avis',
      avis
    );
  }

  public getAvisById(id:number): Observable<any> {
    
    return this.http.get(environment.backendHost + `/avis/${id}`);
  }

  public deleteAvis(id: number): Observable<any> {
    return this.http.delete(environment.backendHost + `/avis/${id}`);
  }

  
}
