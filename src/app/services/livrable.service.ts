import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livrable } from '../model/livrable';


@Injectable({
  providedIn: 'root',
})
export class LivrableService {
  constructor(private http: HttpClient) {}

  public getLivrables(): Observable<any> {
    this.http.get(environment.backendHost + '/livrables').subscribe(
      response=>{console.log(response)}
    )
    return this.http.get(environment.backendHost + '/livrables');
  }
  public getLivrablesByUsername(username: string): Observable<any> {
    return this.http.get(
      environment.backendHost + '/livrables/user/' + username
    );
  }
  public getLivrableById(id: number) {
    return this.http.get<any>(environment.backendHost + '/livrables/' + id);
  }

  public addLivrable(livrable: Livrable): Observable<any> {
    return this.http.post(environment.backendHost + '/livrables', livrable);
  }

  public deleteLivrable(id: number): Observable<any> {
    return this.http.delete(environment.backendHost + '/livrables/' + id);
  }

  public updateLivrable(livrable: Livrable): Observable<any> {
    return this.http.put(environment.backendHost + '/livrables', livrable);
  }

  public searchLivrable(keyword: string): Observable<any> {
    return this.http.get<any>(
      environment.backendHost + '/livrables/search?keyword=' + keyword
    );
  }

  public updateLivrablestatut(livrable: Livrable): Observable<any> {
    return this.http.patch(environment.backendHost + '/update_status_livrable', livrable);
  }
}
