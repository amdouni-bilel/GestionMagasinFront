import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Enseignant } from '../../models/enseignant';
import { ApiEsp_deptService } from '../../services/api-esp_dept.service';
import { ApiEnseignantService } from '../../services/api-enseignant.service';

@Component({
  selector: 'app-ajout-enseignant',
  templateUrl: './ajout-enseignant.component.html',
  styleUrls: ['./ajout-enseignant.component.css']
})
export class AjoutEnseignantComponent implements OnInit {
  addENS: FormGroup ;
  depts:any=[];
  constructor(private apiService:ApiEnseignantService, private apiDept: ApiEsp_deptService, private toastr: ToastrService, 
    private router:Router, private fb: FormBuilder) {  
    let formControls = {
      nom: new FormControl('',Validators.required),
      code: new FormControl('',Validators.required),
      prenom: new FormControl('',Validators.required) ,
      type: new FormControl('', Validators.required) , 
      tel: new FormControl('',[Validators.required,Validators.pattern("[0-9]+"),Validators.minLength(8), Validators.maxLength(8)]), 
      mail: new FormControl('',[ Validators.required, Validators.email]) ,
      sexe: new FormControl('', Validators.required) , 
      departement: new FormControl('', Validators.required) 
    } 
    this.addENS = this.fb.group(formControls)
  }

  get nom() { return this.addENS.get('nom') }
  get code() { return this.addENS.get('code') }
  get prenom() { return this.addENS.get('prenom') }
  get type() { return this.addENS.get('type') } 
  get tel() { return this.addENS.get('tel') } 
  get mail() { return this.addENS.get('mail') } 
  get sexe() { return this.addENS.get('sexe') } 
  get departement() { return this.addENS.get('departement') } 

  ngOnInit(): void {
    this.apiDept.all().subscribe(data=>{
      if(data['RESPONSE']!="ERREUR"){this.depts = data;  }
    },error=>{
      console.log("Error : "+error);
    });
  }


  save(){
    let data = this.addENS.value;  
    let enss = new Enseignant(data.code, data.nom, data.prenom, data.type, data.tel, data.sexe, data.mail, 0, 0, data.departement);
    this.apiService.add(enss).subscribe(data=>{
      console.log("RES : "+data);
      if(data==true){ 
        this.toastr.success('Enseignant ajouté avec succès', 'Succès',{timeOut: 2000});
        this.router.navigate(['/home/enseignant/all'])
      }else {   
        this.toastr.error('Erreur d\'ajout, Enseignant Existe déja', 'Error',{timeOut: 2000});
      }
  }, error=>console.log("ERROR : "+error)); 
  }

}
