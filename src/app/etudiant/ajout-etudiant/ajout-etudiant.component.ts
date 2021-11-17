import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Etudiant } from 'src/app/models/Etudiant';
import { ApiEtudiantService } from 'src/app/services/api-etudiant.service';
import { ApiClasseService } from 'src/app/services/api-classe.service';


@Component({
  selector: 'app-ajout-etudiant',
  templateUrl: './ajout-etudiant.component.html',
  styleUrls: ['./ajout-etudiant.component.css']
})
export class AjoutEtudiantComponent implements OnInit {
  addETD: FormGroup ;
  classes:any=[];
  constructor(private apiService:ApiEtudiantService, private toastr: ToastrService,
              private router:Router, private fb: FormBuilder, private apiClasses:ApiClasseService) {
    let formControls = {
      code: new FormControl('',Validators.required),
      nom: new FormControl('',Validators.required),
      prenom: new FormControl('',Validators.required) ,
      cin: new FormControl('', [Validators.required,Validators.pattern("[0-9]+"),Validators.minLength(8), Validators.maxLength(8)]) ,
      mailEtud: new FormControl('', [ Validators.required, Validators.email]) ,
      classe: new FormControl('', Validators.required )  ,
    }
    this.addETD = this.fb.group(formControls)
  }

  get code() { return this.addETD.get('code') }
  get nom() { return this.addETD.get('nom') }
  get prenom() { return this.addETD.get('prenom') }
  get cin() { return this.addETD.get('cin') }
  get mailEtud() { return this.addETD.get('mailEtud'); }
  get classe() { return this.addETD.get('classe') }

  ngOnInit(): void {
    this.getAllClasses();
  }

  getAllClasses(){
    this.apiClasses.all().subscribe(data=>{
      if(data['RESPONSE']!="ERREUR"){this.classes = data;  }
    },error=>{
      console.log("Error : "+error);
    });
  }

  save(){
    let data = this.addETD.value;
    let etdd = new Etudiant(data.code, data.cin, data.nom, data.prenom,data.mailEtud , data.classe);
    this.apiService.add(etdd).subscribe(resss=>{
      console.log("RES : "+resss);
      if(resss==true){
        this.toastr.success('Etudiant ajouté avec succès', 'Succès',{timeOut: 2000});
        this.router.navigate(['/home/etudiant/all'])
      }else  {
        this.toastr.error('Erreur d\'ajout, Etudiant déja exsite', 'Error',{timeOut: 2000});
      } 
    }, error=>console.log("ERROR : "+error));
  }

}
