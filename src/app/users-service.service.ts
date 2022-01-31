import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from './app.module';
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor(private http: HttpClient) { }

  getData() {
    let url = "https://reqres.in/api/users?page=1";
    return this.http.get<User>(url);
  }
}
