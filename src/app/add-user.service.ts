import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';
import { add_user_model } from 'src/app/MyComponents/users/users.model';
@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private http: HttpClient) { }
  post_user(data:any){
    return this.http.post<any> ("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  get_user(){
    return this.http.get<any> ("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  update_user(data:any,id:number){
    return this.http.put<any> ("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
       return res;
  }))
  }
  delete_user(id:number):Observable<add_user_model> {
    return this.http.delete<add_user_model> ("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
       return res;
  }))
  }
}
