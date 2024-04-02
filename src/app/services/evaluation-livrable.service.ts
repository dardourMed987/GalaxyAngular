import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EvaluationLivrable } from '../model/EvaluationLivrable';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluationLivrableService {

  constructor(private http: HttpClient) {}

 
  public addEvaluationLivrable(evaluationLivrable:EvaluationLivrable):Observable<any>
  {
    return this.http.post(environment.backendHost + '/evaluationLivrables',evaluationLivrable);
  }

  public getEvaluationByLivrable(id:number): Observable<any> {
    
    return this.http.get(environment.backendHost + `/evaluationLivrablesByLivrable/${id}`);
  }

  public getEvaluationById(id:number): Observable<any> {
    
    return this.http.get(environment.backendHost + `/evaluationLivrables/${id}`);
  }

  public sendMail(idClient:number,idLivrable:number): Observable<any> {
    console.log('mail ok ok ');
    return this.http.get(environment.backendHost + `/sendMailClient/${idClient}/${idLivrable}`);

    
  }


}
