import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userNP:string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userNP = localStorage.getItem("userNP");
  }

  quitter(){ 
    localStorage.removeItem("userNP");
    localStorage.removeItem("myToken"); 
    localStorage.removeItem("userID");
    localStorage.removeItem("role"); 
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
