import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiClasseService} from "../../services/api-classe.service";
import {ApiModuleService} from "../../services/api-module.service";
import {Module} from "../../models/module";
import {ApiEnseignantService} from "../../services/api-enseignant.service";

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent implements OnInit {
  editM: FormGroup ;
  classes:any=[];
  enseignants:any=[]; 
  ide:string ;
  
  constructor(private apiService:ApiModuleService, private toastr: ToastrService,
              private router:Router, private fb: FormBuilder, private apiClasses:ApiClasseService, private apiEnseignant:ApiEnseignantService,
              private activatedroute:ActivatedRoute) {

    this.ide =  this.activatedroute.snapshot.paramMap.get("id") ;
    console.log("ID RECUS EDIT: "+this.ide);
    let formControls = {
      code: new FormControl('',Validators.nullValidator),
      designation: new FormControl('',Validators.required),
      nbrHeures: new FormControl('',[Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]) ,
      coefficient: new FormControl('',[Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]) ,
      typeEpreuve: new FormControl('',Validators.required) ,
      semestre: new FormControl('',Validators.required) ,
      periode: new FormControl('',Validators.required) ,
      classe: new FormControl('', Validators.required )  ,
      enseignant: new FormControl('',Validators.required) ,

    }
    this.editM = this.fb.group(formControls)
  }

  get code() { return this.editM.get('code') }
  get designation() { return this.editM.get('designation') }
  get nbrHeures() { return this.editM.get('nbrHeures') }
  get coefficient() { return this.editM.get('coefficient') }
  get typeEpreuve() { return this.editM.get('typeEpreuve') }
  get semestre() { return this.editM.get('semestre') }
  get periode() { return this.editM.get('periode') }
  get classe() { return this.editM.get('classe') }
  get enseignant() { return this.editM.get('enseignant') }

  ngOnInit(): void {
    this.getInfoModule();
    this.getAllClasses();
    this.getAllEnseignants();
  }


  getInfoModule(){
    this.apiService.info(this.ide).subscribe(data=>{
      console.log("RES info module : "+data);
      let mdl = data ;
      this.editM.patchValue({
        code : mdl.codeModule,
        designation : mdl.designation,
        nbrHeures : mdl.nbrHeures	,
        coefficient : mdl.coefficient	,
        typeEpreuve : mdl.typeEpreuve	,
        semestre : mdl.semestre	,
        periode : mdl.periode	, 
        enseignant : mdl.enseignant.idEns,
        classe : mdl.classe.codeCL
      })
    }, error=>console.log("ERROR: "+error));
  }

  getAllClasses(){
    this.apiClasses.all().subscribe(data=>{
      if(data['RESPONSE']!="ERREUR"){this.classes = data;  }
    },error=>{
      console.log("Error : "+error);
    });
  }
  getAllEnseignants(){
    this.apiEnseignant.all().subscribe(data=>{
      if(data['RESPONSE']!="ERREUR"){this.enseignants = data;  }
    },error=>{
      console.log("Error : "+error);
    });
  }

  save(){
    let data = this.editM.value;
    let mdll = new Module(this.ide, data.designation, data.nbrHeures,data.coefficient,data.typeEpreuve,data.semestre,data.periode, data.classe, data.enseignant);
    this.apiService.editt(mdll).subscribe(data=>{
      console.log("RES : "+data);
      if(data==true){
        this.toastr.success('Module  modifié avec succès', 'Succès',{timeOut: 2000});
        this.router.navigate(['/home/module/all'])
      }else {
        this.toastr.error('Erreur de modification', 'Error',{timeOut: 2000});
      }
    }, error=>console.log("ERROR : "+error));
  }

}
