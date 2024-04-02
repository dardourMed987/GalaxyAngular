import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {



  private host = environment.backendHost;
  private _userCourant: any;

  public get userCourant() {
    return this._userCourant;
  }
  public set userCourant(value: any) {
    this._userCourant = value;
  }
  get(id: string) {
    return this.http.get<any>(`${this.host}/find/` + id);
  }

  constructor(private http: HttpClient,private authSerivce: AuthService) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public getUsersByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/find/` + username);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user/add`, user);
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.http.post<User>(
      `${this.host}/user/updateProfileImage`,
      formData,
      { reportProgress: true, observe: 'events' }
    );
  }

  public addUsersToLocalCache(users: User[]): void {}

  public getUsersFromLocalCache() {
    return null;
  }

  public createUserFormDate(
    loggedInUsername: string,
    user: User,
    profileImage: File
  ): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.roles);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    return formData;
  }

  public searchUsers(keyword: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(
      environment.backendHost + '/user/search?keyword=' + keyword
    );
  }
  public findUsersIfRoleIsApprenant(keyword: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(
      environment.backendHost +
        '/user/ifroleapprenant/search?keyword=' +
        keyword
    );
  }

  public deleteUser(id: string) {
    return this.http.delete(environment.backendHost + '/user/' + id);
  }

  public findUserBySujet(id:number)
  {
    return this.http.get<any>(`${this.host}/userWithDocumentSujet/` + id);
  }

  public changePassword(pass:string)
  {
    const formData = new FormData();
    formData.append("username",this.authSerivce.username)
    formData.append("password",pass)
    return this.http.post(`${this.host}/updatePassword`,formData);
  }
}