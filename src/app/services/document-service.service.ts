import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Document } from '../model/document';
import { AuthService } from './auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DocumentServiceService {


  constructor(private http: HttpClient,
    private authService:AuthService,
    
  ) { }


  createDocuement(formData: FormData): Observable<any> {
    return this.http.post(environment.backendHost + '/createDocument', formData);
  }

  public getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(environment.backendHost + '/documents');
  }

  downloadDocument(id: number) : Observable<Blob>  {
    return this.http.get(environment.backendHost + `/documents/download/${id}`, { responseType: 'blob' });
    /* this.http.get(environment.backendHost+`/documents/download/${id}`, { responseType: 'blob' })
      .subscribe(response => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `document_${id}`;
        a.click();
        window.URL.revokeObjectURL(url);
      });*/
  }

      getDocumentUrl(id: number): Observable<Blob> {
        return this.http.get<Blob>(`${environment.backendHost}/documents/download/${id}`, { responseType: 'blob' as 'json' });
      }

  public deleteDocument(id: number): Observable<void> {
    return this.http.delete<void>(
      environment.backendHost + '/documents/' + id
    );
  }

  updateDocument(id: number, documentData: FormData): Observable<any> {
    return this.http.put(environment.backendHost + '/documents/' + id, documentData);
  }

  

  public getDocumentById(id:number): Observable<Document> {
    return this.http.get<Document>(environment.backendHost + '/documents/' + id);
  }

  getVideoUrl(id: number): Observable<Blob> {
    
    return this.http.get(`${environment.backendHost}/documents/download/${id}`, {
      
      responseType: 'blob'
    });
  }

  downloadDocumentPdf(id: number): Observable<Blob> {
    return this.http.get(environment.backendHost + `/documents/download/${id}`, { responseType: 'blob' });
  }

 

}


