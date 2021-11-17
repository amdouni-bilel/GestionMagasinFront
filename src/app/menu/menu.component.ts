import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isAdmin:boolean= false ;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("role")=="Admin"){
      this.isAdmin = true; 
    }else{
      this.isAdmin = false; 
    }
  }

}
