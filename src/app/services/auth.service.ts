import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL="https://routeegypt.herokuapp.com/"

  constructor(private _HttpClient:HttpClient) { }

  signUP(data):Observable<any>{
    return this._HttpClient.post(this.baseURL+'signup',data);
  }
  signIn(data):Observable<any>{
    return this._HttpClient.post(this.baseURL+'signin',data);
  }
  signOut(data):Observable<any>{
    return this._HttpClient.post(this.baseURL+'signOut',data);
  }
  isLoggedIn(){
    //return true if there's a token in the locall storage,!convert string to false(boolean), !!convert string to true(boolean)
    return !!localStorage.getItem("TOKEN")
  }

}
