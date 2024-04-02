import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentProjet } from '../model/document-projet';

@Injectable({
  providedIn: 'root',
})
export class DocumentProjetService {
  constructor(private http: HttpClient) {}

  public getAllDocumentProjet(): Observable<any> {
    return this.http.get(environment.backendHost + '/documentProjets');
  }

  public getDocumentProjetById(id: number) {
    return this.http.get<any>(
      environment.backendHost + '/documentProjets/' + id
    );
  }

  public addDocumentProjet(documentProjet: DocumentProjet): Observable<any> {
    return this.http.post(
      environment.backendHost + '/documentProjets',
      documentProjet
    );
  }

  public deleteDocumentProjet(id: number): Observable<any> {
    return this.http.delete(environment.backendHost + '/documentProjets/' + id);
  }

  public updateDocumentProjet(documentProjet: DocumentProjet): Observable<any> {
    return this.http.put(
      environment.backendHost + '/documentProjets',
      documentProjet
    );
  }
}
