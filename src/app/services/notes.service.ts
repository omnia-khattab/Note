import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  baseURL="https://routeegypt.herokuapp.com/";
  constructor(private _HttpClient:HttpClient) { }

  //"data" are the token and the userID
  getAllNotes(data):Observable<any>{
    return this._HttpClient.post(this.baseURL+'getUserNotes',data);
  }

  addNote(data):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'addNote',data)
  }

  updateNote(data):Observable<any>
  {
    return this._HttpClient.put(this.baseURL+'updateNote',data)
  }

  deleteNote(data):Observable<any>
  {
    let options={
      headers:new HttpHeaders({}),
      body:{
        token:data.token,
        NoteID:data.NoteID
      }
      
    }
    return this._HttpClient.delete(this.baseURL+'deleteNote',options)
  }
}
