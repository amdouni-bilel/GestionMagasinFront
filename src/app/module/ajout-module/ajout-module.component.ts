import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ApiClasseService} from "../../services/api-classe.service";
import {ApiModuleService} from "../../services/api-module.service";
import {Module} from "../../models/module";
import {ApiEnseignantService} from "../../services/api-enseignant.service";

@Component({
  selector: 'app-ajout-module',
  templateUrl: './ajout-module.component.html',
  styleUrls: ['./ajout-module.component.css']
})
export class AjoutModuleComponent implements OnInit {
  addMDL: FormGroup ;
  classes:any=[];
  enseignants:any=[];
  constructor(private apiService:ApiModuleService, private toastr: ToastrService,
              private router:Router, private fb: FormBuilder, private apiClasses:ApiClasseService ,private apiEnseignants:ApiEnseignantService ) {
    let formControls = {
      code: new FormControl('',Validators.required),
      designation: new FormControl('',Validators.required),
      nbrHeures: new FormControl('',[Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]) ,
      coefficient: new FormControl('',[Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]) ,
      typeEpreuve: new FormControl('',Validators.required) ,
      semestre: new FormControl('',Validators.required) ,
      periode: new FormControl('',Validators.required) ,
      classe: new FormControl('', Validators.required )  ,
      enseignant: new FormControl('',Validators.required) ,

    }
    this.addMDL = this.fb.group(formControls)
  }

  get code() { return this.addMDL.get('code') }
  get designation() { return this.addMDL.get('designation') }
  get nbrHeures() { return this.addMDL.get('nbrHeures') }
  get coefficient() { return this.addMDL.get('coefficient') }
  get typeEpreuve() { return this.addMDL.get('typeEpreuve') }
  get semestre() { return this.addMDL.get('semestre') }
  get periode() { return this.addMDL.get('periode') }
  get classe() { return this.addMDL.get('classe') }
  get enseignant() { return this.addMDL.get('enseignant') }


  ngOnInit(): void {
    this.getAllClasses();
    this.getAllEnseignants();
  }


  getAllClasses(){
    this.apiClasses.all().subscribe(data=>{
      if(data['RESPONSE']!="ERREUR"){this.classes = data;  }
    },error=>{
      console.log("Error : "+error);
    });
  }

  getAllEnseignants() {
    this.apiEnseignants.all().subscribe(data=>{
      if(data['RESPONSE']!="ERREUR"){this.enseignants = data;  }
    },error=>{
      console.log("Error : "+error);
    });
  }


  save(){
    let data = this.addMDL.value;
    let mdl = new Module(data.code, data.designation, data.nbrHeures ,data.coefficient,data.typeEpreuve,data.semestre,data.periode,data.classe, data.enseignant);
    this.apiService.add(mdl).subscribe(data=>{
      console.log("RES : "+data);
      if(data==true){
        this.toastr.success('Module ajouté avec succès', 'Succès',{timeOut: 2000});
        this.router.navigate(['/home/module/all'])
      }else {
        this.toastr.error('Erreur d\'ajout, Code ou Designation Module Déja existe', 'Error',{timeOut: 2000});
      }
    }, error=>console.log("ERROR : "+error));
  }


}
