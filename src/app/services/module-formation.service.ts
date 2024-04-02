import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModuleFormation } from '../model/module-formation';

@Injectable({
  providedIn: 'root',
})
export class ModuleFormationService {
  constructor(private http: HttpClient) {}

  public getModules(): Observable<ModuleFormation[]> {
    return this.http.get<ModuleFormation[]>(
      environment.backendHost + '/modules'
    );
  }

  public getModuleById(id: number) {
    return this.http.get<ModuleFormation>(
      environment.backendHost + '/modules/' + id
    );
  }

  public addModule(module: ModuleFormation): Observable<ModuleFormation> {
    return this.http.post<ModuleFormation>(
      environment.backendHost + '/addModule',
      module
    );
  }

  public deleteModule(id: number): Observable<void> {
    return this.http.delete<void>(
      environment.backendHost + '/deleteModule/' + id
    );
  }

  public updateModule(module: ModuleFormation): Observable<void> {
    return this.http.put<void>(
      environment.backendHost + '/updateModule',
      module
    );
  }
}
