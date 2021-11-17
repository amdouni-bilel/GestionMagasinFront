
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiSalleService {

  private  baseUrl = 'http://localhost:9092/springboot-crud-rest/api/salles';
  constructor(private http: HttpClient) { }

  all(){
    return this.http.get(`${this.baseUrl}`);
  }

  verifSalle(date, heure){
    let body = {date:date, heure:heure};
    return this.http.post("http://localhost:9092/springboot-crud-rest/api/verifSalle", body);
  }

  add(sal){
    return this.http.post(`${this.baseUrl}`, sal);
  }

  editt(sal){
    return this.http.put(`${this.baseUrl}`, sal);
  }

  info(sal){
    return this.http.get<any>(`${this.baseUrl}/${sal}`);
  }

  delete(sal){
    console.log("idd : "+sal);
    return this.http.delete(`${this.baseUrl}/${sal}`);
  }

}
