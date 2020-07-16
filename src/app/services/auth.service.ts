import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getLoggedInName = new Subject();
  private regurl = `${environment.api_url}/register`;
  private logurl = `${environment.api_url}/login`;



  constructor(private http: HttpClient) { }

  registerUser =  (data) => {
    return this.http.post<any>(this.regurl,data);
  }

  loginUser = (data) => {
    return this.http.post<any>(this.logurl,data) .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      this.getLoggedInName.next(data.email);
      return user;
  }));
  }

  authenticateUser = () => {
    return !!JSON.parse(localStorage.getItem("token"));
  }

  getToken = () => {
    return JSON.parse(localStorage.getItem("token"));
  }

  getUser = () => {
    if(localStorage.getItem("token")){
      const token =JSON.parse(localStorage.getItem("token"));
      const userId = token.user._id;
      return this.http.get<any>(`${environment.api_url}/user/${userId}`)
    }
  }

  logoutUser = () => {
    this.getLoggedInName.next(null);
    return localStorage.removeItem("token");
  }



  
}
