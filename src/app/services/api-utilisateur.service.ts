import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiUtilisateurService {

  private  baseUrl = 'http://localhost:9092/springboot-crud-rest/api/users';
  constructor(private http: HttpClient) { }

 

  veifUser(usrr){  
    return this.http.post(`${this.baseUrl}/login`, usrr);
  } 
  
  
  isLoggedIn(){ 
    let token = localStorage.getItem("myToken"); 
    if (token) {
      return true ;
    } else {
      return false;
    }
  }
}
