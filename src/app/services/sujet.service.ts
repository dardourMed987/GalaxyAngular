import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sujet } from '../model/sujet';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class SujetService {
  constructor(private http: HttpClient) {}

  public getSujets(): Observable<any> {
    return this.http.get(environment.backendHost + '/sujets');
  }

  public getSujetsSupp(): Observable<any> {
    return this.http.get(environment.backendHost + '/sujetsSupp');
  }
  public getSujetsByUsername(username: string): Observable<any> {
    return this.http.get(environment.backendHost + '/sujets/user/' + username);
  }

  trouverDocumentProjetUtilisateurs(suejtId: number,userId: string)
  {
    return this.http.get(environment.backendHost + '/sujets/trouverDocumentProjetUtilisateurs/' + suejtId+'/'+userId);
  }
  public getDocumentProjetUtilisateurs(
    suejtId: number,
    userId: string
  ): Observable<any> {
    return this.http.get(
      environment.backendHost +
        '/documentProjetUtilisateurs/' +
        suejtId +
        '/' +
        userId
    );
  }
  public getSujetById(id: number) {
    return this.http.get<any>(environment.backendHost + '/sujets/' + id);
  }

  public addSujet(sujet: Sujet): Observable<any> {
    sujet.statut=1;
    return this.http.post(environment.backendHost + '/sujets', sujet);
  }

  public deleteSujet(id: number): Observable<any> {
    return this.http.delete(environment.backendHost + '/sujets/' + id);
  }
  public deleteOneFromDocumentProjetUtilisateurs(
    idSujet: number,
    idUser: string
  ): Observable<any> {
    return this.http.delete(
      environment.backendHost + '/sujets/' + idSujet + '/' + idUser
    );
  }

  public updateSujet(sujet: Sujet): Observable<any> {
    return this.http.put(environment.backendHost + '/sujets', sujet);
  }

  public updateSujetStatus(sujet: Sujet): Observable<any> {
    return this.http.patch(environment.backendHost + '/update_status_sujets', sujet);
  }

  public affectSujetToUser(idSujet: string, idUser: string,dateDebut:Date,dateFin:Date): Observable<any> {
    const formData = new FormData();
    formData.append('idSujet', idSujet);
    formData.append('idUser', idUser);
    formData.append('dateDebut', this.formatDate(dateDebut));
    formData.append('dateFin', this.formatDate(dateFin));
    const requestHttp = new HttpRequest(
      'POST',
      environment.backendHost + '/sujets/insertsujetuser',
      formData,
      {
        reportProgress: true,
        responseType: 'text',
      }
    );
    return this.http.request(requestHttp);
  }

  public modifierDateFin(idSujet: string, idUser: string,dateFin:Date): Observable<any> {
    const formData = new FormData();
    formData.append('idSujet', idSujet);
    formData.append('idUser', idUser);
    formData.append('dateFin', this.formatDate(dateFin));
    const requestHttp = new HttpRequest(
      'PUT',
      environment.backendHost + '/sujets/modifierDateFin',
      formData,
      {
        reportProgress: true,
        responseType: 'text',
      }
    );
    return this.http.request(requestHttp);
  }

  public formatDate(date: Date): string {
    
    const mois = date.getMonth() + 1; 
    const jour = date.getDate();
    const annee = date.getFullYear();
    const dateFormatee = `${mois.toString().padStart(2, '0')}/${jour.toString().padStart(2, '0')}/${annee}`;

    return dateFormatee;
}
}
