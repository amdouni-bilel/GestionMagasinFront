import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiModuleService {
  private  baseUrl = 'http://localhost:9092/springboot-crud-rest/api/modules';
  constructor(private http: HttpClient) { }

  add(mod){
    return this.http.post(`${this.baseUrl}`, mod);
  }

  editt(mod){
    return this.http.put(`${this.baseUrl}`, mod);
  }

  all(){
    return this.http.get(`${this.baseUrl}`);
  }

  delete(id){
    console.log("idd : "+id);
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  info(id){
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
