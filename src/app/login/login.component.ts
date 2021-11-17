import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiUtilisateurService } from 'src/app/services/api-utilisateur.service';
import { Utilisateur } from '../models/Utilisateur';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logForm: FormGroup ;
  constructor(private apiService:ApiUtilisateurService, private toastr: ToastrService, private router:Router, private fb: FormBuilder) { 

    let formControls = {
      mail: new FormControl('', [ Validators.required, Validators.email] ), 
      password: new FormControl('', Validators.required ) 
    } 
    this.logForm = this.fb.group(formControls)
  }

  get mail() { return this.logForm.get('mail') }
  get password() { return this.logForm.get('password') } 

  ngOnInit(): void { 
    let isLoggedIn = this.apiService.isLoggedIn(); 
    if (isLoggedIn) {
      this.router.navigate(['/home']);
    }  
  }
 
  verifUser(){ 
    let data = this.logForm.value; 
    console.log("mail : "+data.mail);
    console.log("password : "+data.password);
    let usrr = new Utilisateur(null,null, null, null, data.mail, data.password);
    this.apiService.veifUser(usrr).subscribe(res=>{
      console.log("res : "+res);
      let result:any = res;
      console.log("result : "+result);
      if(result.nomUser!=null){  
        console.log("RESULTAT : "+res['nomUser']);
        let token = this.randStr(32);
        console.log("TOKEN GENERATED : "+token);
        localStorage.setItem("userID", result.idUser); 
        localStorage.setItem("role", result.grade);  
        localStorage.setItem("userNP", result.nomUser+" "+result.prenomUser);
        localStorage.setItem("myToken", token);
        this.router.navigate(['/home']);
        this.toastr.success('Bienvenue '+result.nomUser+" "+result.prenomUser, 'Succès',{timeOut: 2000});
       }else{
        this.toastr.error('SVP verifier votre E-mail et mot de passe', 'Error',{timeOut: 2000});
       }
    }, error=>{
      this.toastr.error('Erreur', 'Error',{timeOut: 2000});
      console.log("Erreur : "+error);
    }) 
  }

  randStr(len) {
    let s = '';
    while (len--) s += String.fromCodePoint(Math.floor(Math.random() * (126 - 33) + 33));
    return s;
  }

}
