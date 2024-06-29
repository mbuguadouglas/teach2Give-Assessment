import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginUser, registerUser, userResponse } from '../../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http:HttpClient ) { }//add fetching http

  private isLoggedIn = false
  private readonly baseUrl:string = 'http://localhost:4000/auth/'

  // show if logged in or not
  showStatus(){
    return this.isLoggedIn
  }

  // cretae logged in method
  login(){
    this.isLoggedIn = true
  }

  // create logged out method
  logout(){
    this.isLoggedIn = false
  }

  registerUser(newUser:registerUser):Observable<userResponse>{
    // '' should be the path in your backend not your frontend
    return this.http.post<userResponse>(this.baseUrl+'register', newUser)
  }

  loginUser(user:loginUser):Observable<userResponse>{
    return this.http.post <userResponse>(this.baseUrl+'login',user)
  }
}
