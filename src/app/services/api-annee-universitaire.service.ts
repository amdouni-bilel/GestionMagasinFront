import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiAnneeUniversitaireService {

  private  baseUrl = 'http://localhost:9092/springboot-crud-rest/api/aus';
  constructor(private http: HttpClient) { }
 
  all(){ 
    return this.http.get(`${this.baseUrl}`);
  } 
   
}
