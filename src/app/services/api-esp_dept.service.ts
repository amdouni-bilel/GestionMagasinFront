import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiEsp_deptService {
  private  baseUrl = 'http://localhost:9092/springboot-crud-rest/api/espdept';
  constructor(private http: HttpClient) { }

  all(){
    return this.http.get(`${this.baseUrl}`);
  }

  add(esp_dept){
    return this.http.post(`${this.baseUrl}`, esp_dept);
  }

  editt(esp_dept){
    return this.http.put(`${this.baseUrl}`, esp_dept);
  }

  info(id){
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  delete(id){
    console.log("idd : "+id);
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
