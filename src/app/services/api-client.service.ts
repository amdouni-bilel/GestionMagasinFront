
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private  baseUrl = 'http://localhost:9092/api/client';
  private body: any;
  constructor(private http: HttpClient) { }

  all(){
    return this.http.get('http://localhost:9092/api/client/getAllClient' );
  }


  add(clientss){
    return this.http.post('http://localhost:9092/api/client/addClient', this.body);
  }

  editt(clientss){
    return this.http.put(`${this.baseUrl}`, clientss);
  }

  info(clientss){
    return this.http.get<any>(`${this.baseUrl}/${clientss}`);
  }

  delete(clientss){
    console.log("idd : "+clientss);
    return this.http.delete('http://localhost:9092/api/client/client');
  }

}
