import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Etudiant } from 'src/app/models/Etudiant';
import { ApiClasseService } from 'src/app/services/api-classe.service';
import { ApiEtudiantService } from 'src/app/services/api-etudiant.service';

@Component({
  selector: 'app-edit-etudiant',
  templateUrl: './edit-etudiant.component.html',
  styleUrls: ['./edit-etudiant.component.css']
})
export class EditEtudiantComponent implements OnInit {
  addETD: FormGroup ;
  classes:any=[];
  ide:string;
  constructor(private apiService:ApiEtudiantService, private toastr: ToastrService,
              private router:Router, private fb: FormBuilder, private apiClasses:ApiClasseService,
              private activatedroute:ActivatedRoute) {

    this.ide =  this.activatedroute.snapshot.paramMap.get("id");
    console.log("ID RECUS EDIT: "+this.ide);
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
    this.getInfoEtudiant();
    this.getAllClasses();
  }


  getInfoEtudiant(){
    this.apiService.info(this.ide).subscribe(data=>{
      console.log("RES info etudiant : "+data['nom']);
      let etd = data ;
      this.addETD.patchValue({
        code : etd.id,
        nom : etd.nom,
        prenom : etd.prenom	,
        cin : etd.cin	,
        mailEtud : etd.mailEtud	,
        classe : etd.classe.codeCL
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

  save(){
    let data = this.addETD.value;
    let etdd = new Etudiant(this.ide, data.cin, data.nom, data.prenom,data.mailEtud , data.classe);
    this.apiService.editt(etdd).subscribe(data=>{
      console.log("RES : "+data);
      if(data==true){
        this.toastr.success('Etudiant modifié avec succès', 'Succès',{timeOut: 2000});
        this.router.navigate(['/home/etudiant/all'])
      }else {
        this.toastr.error('Erreur de modification', 'Error',{timeOut: 2000});
      }
    }, error=>console.log("ERROR : "+error));
  }

}
