import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Examen } from 'src/app/models/Examen';
import { ApiExamenService } from 'src/app/services/api-examen.service';
import { ApiEnseignantService } from 'src/app/services/api-enseignant.service';
import { ApiModuleService } from 'src/app/services/api-module.service';
import { ApiSalleService } from 'src/app/services/api-salle.service';
import { ApiClasseService } from 'src/app/services/api-classe.service';
import { ApiAnneeUniversitaireService } from 'src/app/services/api-annee-universitaire.service';

@Component({
  selector: 'app-edit-examen',
  templateUrl: './edit-examen.component.html',
  styleUrls: ['./edit-examen.component.css']
})
export class EditExamenComponent implements OnInit {
  minDate = new Date(Date.now() + 1*24*60*60*1000).toISOString();
  editEX: FormGroup ;
  enseignantOfModule:any={} ; 
  surveillants:any=[];
  salles:any=[];
  classes:any=[];
  modules:any=[];
  typesEx:any=[];
  modulsssss:any=[];  
  idEx:number ;
  constructor(private apiEns:ApiEnseignantService,
              private apiExamen:ApiExamenService,
              private apiModule:ApiModuleService,
              private apiSalle:ApiSalleService,
              private apiClasse:ApiClasseService,
              private apiAU:ApiAnneeUniversitaireService,
              private toatr: ToastrService,
              private activateRoute: ActivatedRoute,
              private router:Router, private fb: FormBuilder) {
    this.idEx = parseInt(this.activateRoute.snapshot.paramMap.get("id"));
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
    this.editEX = this.fb.group(formControls);
  }

  get dateEX() { return this.editEX.get('dateEX') }
  get heureEX() { return this.editEX.get('heureEX') }
  get dureeEX() { return this.editEX.get('dureeEX') }
  get dsex() { return this.editEX.get('dsex') }
  get typeEX() { return this.editEX.get('typeEX') }
  get semestre() { return this.editEX.get('semestre') }
  get session() { return this.editEX.get('session') }
  get classe() { return this.editEX.get('classe') }
  get module() { return this.editEX.get('module') }
  get enseignant() { return this.editEX.get('enseignant') }
  get salle() { return this.editEX.get('salle') }  
  get surveillant() { return this.editEX.get('surveillant') }
  get groupe() { return this.editEX.get('groupe') }

  ngOnInit(): void {
    this.getInfoExamen();
    this.getModules();
    this.getClasses(); 
    this.getEnseignants();
    this.getSalles();
  }

  getEnseignants(){
    this.apiEns.all().subscribe(data=>{ this.surveillants = data; 
    },error=>{  console.log("Error : "+error);
    });
  }

  getSalles(){
    this.apiSalle.all().subscribe(data=>{ this.salles = data; 
    },error=>{  console.log("Error salles : "+error);
    }); 
  }

  getInfoExamen(){
    this.apiExamen.info(this.idEx).subscribe(data=>{
      console.log("RES info examen : "+data);
      let exx = data ;
      this.editEX.patchValue({
        dateEX : exx.dateEx,
        heureEX : exx.heureEx	,
        dureeEX : exx.dureeEx	,
        dsex : exx.dsex	,
        typeEX : exx.typeEx	,
        semestre : exx.semestre,
        session : exx.session   , 
        classe : exx.classe.codeCL   ,
        enseignant : exx.espModule.enseignant.nom +" "+exx.espModule.enseignant.prenom  ,
        module : exx.espModule.codeModule   ,
        salle : exx.salle.codeSalle ,
        groupe : exx.groupe,
        surveillant : exx.enseignant.idEns
      })

    }, error=>console.log("ERROR: "+error));
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
    this.modulsssss = ress ;
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
    let formsInfo = this.editEX.value;
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
    let data = this.editEX.value;
    let ex = new Examen(this.idEx, data.dateEX, data.heureEX, data.dureeEX, data.dsex, data.semestre, data.session,  data.typeEX, data.classe, data.module, data.surveillant, data.salle, data.groupe);
    this.apiExamen.editt(ex).subscribe(data=>{
      console.log("RES : "+data);
      if(data==true){
        this.toatr.success('Examen modifié avec succès', 'Succès',{timeOut: 2000});
        this.router.navigate(['/home/examen/all'])
      }else {
        this.toatr.error('Erreur de modification', 'Error',{timeOut: 2000});
      }
    }, error=>console.log("ERROR : "+error));
  }

}
