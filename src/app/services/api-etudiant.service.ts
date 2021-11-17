import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiEtudiantService {
  private  baseUrl = 'http://localhost:9092/springboot-crud-rest/api/etudiants';
  constructor(private http: HttpClient) { }

  add(etd){ 
    return this.http.post(`${this.baseUrl}`, etd);
  }  

  editt(etd){ 
    return this.http.put(`${this.baseUrl}`, etd);
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
