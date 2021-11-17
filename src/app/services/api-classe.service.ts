import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiClasseService {
  private  baseUrl = 'http://localhost:9092/springboot-crud-rest/api/classes';
  constructor(private http: HttpClient) { }

  add(cls){
    return this.http.post(`${this.baseUrl}`, cls);
  }

  editt(cls){
    return this.http.put(`${this.baseUrl}`, cls);
  }

  all(){
    return this.http.get(`${this.baseUrl}`);
  }

  info(id){
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  delete(id){
    console.log("idd : "+id);
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
