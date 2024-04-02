import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Formation } from '../model/formation';

@Injectable({
  providedIn: 'root',
})
export class FormationService {
  formationId: any;

  constructor(private http: HttpClient) {}

  public getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(environment.backendHost + '/formations');
  }

  public getFormationById(idFormation: number) {
    return this.http.get<any>(
      environment.backendHost + '/formations/' + idFormation
    );
  }

  public addFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(
      environment.backendHost + '/addFormation',
      formation
    );
  }

  public deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(
      environment.backendHost + '/deleteFormation/' + id
    );
  }

  public updateFormation(formation: Formation): Observable<void> {
    return this.http.put<void>(
      environment.backendHost + '/updateFormation',
      formation
    );
  }
}
