import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiEnseignantService {
  private  baseUrl = 'http://localhost:9092/springboot-crud-rest/api/enseignants';
  constructor(private http: HttpClient) { }

  add(ens){
    return this.http.post(`${this.baseUrl}`, ens);
  }

  verifEnseignant(date, heure){
    let body = {date:date, heure:heure};
    return this.http.post("http://localhost:9092/springboot-crud-rest/api/verifEnseignant", body);
  }

  editt(ens){
    return this.http.put(`${this.baseUrl}`, ens);
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
