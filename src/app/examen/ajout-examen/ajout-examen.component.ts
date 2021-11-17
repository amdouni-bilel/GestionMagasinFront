import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Examen } from 'src/app/models/Examen';
import { ApiExamenService } from 'src/app/services/api-examen.service';
import { ApiEnseignantService } from 'src/app/services/api-enseignant.service';
import { ApiModuleService } from 'src/app/services/api-module.service';
import { ApiSalleService } from 'src/app/services/api-salle.service';
import { ApiClasseService } from 'src/app/services/api-classe.service';
import { ApiAnneeUniversitaireService } from 'src/app/services/api-annee-universitaire.service';

@Component({
  selector: 'app-ajout-examen',
  templateUrl: './ajout-examen.component.html',
  styleUrls: ['./ajout-examen.component.css']
})
export class AjoutExamenComponent implements OnInit {
  minDate = new Date(Date.now() + 1*24*60*60*1000).toISOString();
  addEX: FormGroup ;
  enseignantOfModule:any={} ; 
  surveillants:any=[];
  salles:any=[];
  classes:any=[];
  modules:any=[];
  typesEx:any=[];
  modulsssss:any=[];  
  constructor(private apiEns:ApiEnseignantService,
              private apiExamen:ApiExamenService,
              private apiModule:ApiModuleService,
              private apiSalle:ApiSalleService,
              private apiClasse:ApiClasseService,
              private apiAU:ApiAnneeUniversitaireService,
              private toatr: ToastrService,
              private router:Router, private fb: FormBuilder) {
    let formControls = {
      dateEX: new FormControl('',Validators.required),
      heureEX: new FormControl('',Validators.required),
      dureeEX: new FormControl('',[Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]) ,
      dsex: new FormControl('', Validators.required) ,
      typeEX: new FormControl('',Validators.required)  ,
      semestre: new FormControl('',Validators.required),
      session: new FormControl('',Validators.required)  ,
      classe: new FormControl('',Validators.required)  ,
      module: new FormControl('',Validators.required)   ,
      enseignant: new FormControl('',Validators.nullValidator)  ,
      salle: new FormControl('',Validators.required) ,
      surveillant: new FormControl('',Validators.required) ,
      groupe: new FormControl('',Validators.required) 
    }
    this.addEX = this.fb.group(formControls);
  }

  get dateEX() { return this.addEX.get('dateEX') }
  get heureEX() { return this.addEX.get('heureEX') }
  get dureeEX() { return this.addEX.get('dureeEX') }
  get dsex() { return this.addEX.get('dsex') }
  get typeEX() { return this.addEX.get('typeEX') }
  get semestre() { return this.addEX.get('semestre') }
  get session() { return this.addEX.get('session') }
  get classe() { return this.addEX.get('classe') }
  get module() { return this.addEX.get('module') }
  get enseignant() { return this.addEX.get('enseignant') }
  get salle() { return this.addEX.get('salle') }  
  get surveillant() { return this.addEX.get('surveillant') }
  get groupe() { return this.addEX.get('groupe') }

  ngOnInit(): void {
    this.getModules();
    this.getClasses(); 
  }

  getModules(){
    this.apiModule.all().subscribe(data=>{ this.modulsssss = data; this.typesEx= data;
    },error=>{  console.log("Error module : "+error);
    });
  }
  getClasses(){
    this.apiClasse.all().subscribe(data=>{ this.classes = data;
    },error=>{  console.log("Error classe : "+error);
    });
  } 

  onChangeClasse(classeValue) {
    console.log("classe :"+classeValue);  
    let ress = this.modulsssss.filter(item=>item.classe.codeCL==classeValue) ;   
    this.modules=[] ;
    this.modules = ress ; 
  }

  onChangeModule(moduleValue) {
    console.log("module :"+moduleValue); 
    this.enseignantOfModule = {}; 
    let ress = this.modulsssss.filter(item=>item.codeModule==moduleValue) ;   
    this.enseignantOfModule = ress[0]['enseignant']; 
    console.log("ress[0]----------> :"+this.enseignantOfModule.nom); 
  }

  checkDisponibilite( ){
    let formsInfo = this.addEX.value;
    console.log("Date------------> "+formsInfo.dateEX); 
    console.log("heure------------> "+formsInfo.heure); 
    if(formsInfo.dateEX!="" && formsInfo.heureEX!=""){
      console.log("gooooooooooooo ");
      this.apiEns.verifEnseignant(formsInfo.dateEX, formsInfo.heureEX).subscribe(data=>{ this.surveillants = data;
      },error=>{  console.log("Error : "+error);
      });

      this.apiSalle.verifSalle(formsInfo.dateEX, formsInfo.heureEX).subscribe(data=>{ this.salles = data;
      },error=>{  console.log("Error salles : "+error);
      });
    }

    
  }

  save(){  
    let data = this.addEX.value;
    let ex = new Examen(null,data.dateEX, data.heureEX, data.dureeEX, data.dsex, data.semestre, data.session,  data.typeEX, data.classe, data.module, data.surveillant, data.salle, data.groupe );
    this.apiExamen.add(ex).subscribe(data=>{
      console.log("RES : "+data);
      if(data==true){
        this.toatr.success('Examen ajouté avec succès', 'Succès',{timeOut: 2000});
        this.router.navigate(['/home/examen/all'])
      }else {
        this.toatr.error('Erreur d\'ajout, Examen déja Existe pour ce Classe', 'Error',{timeOut: 2000});
      }
    }, error=>console.log("ERROR : "+error));
  }

}
