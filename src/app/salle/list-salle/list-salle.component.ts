import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiSalleService } from '../../services/api-salle.service';
import { ToastrService } from 'ngx-toastr';
import { Salle } from '../../models/salle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-salle',
  templateUrl: './list-salle.component.html',
  styleUrls: ['./list-salle.component.css']
})
export class ListSalleComponent implements OnInit {
  formSal: FormGroup;
  salles:any = [];
  ids : string ; 
  constructor(private service:ApiSalleService, private fb: FormBuilder, private modalService: NgbModal, 
    private toastr: ToastrService, private router:Router) {
    let formControls = {
      capacite: new FormControl('',[Validators.required,Validators.pattern("[0-9]+"),Validators.minLength(2), Validators.maxLength(3)]),
      site: new FormControl('',Validators.required), 
      code: new FormControl('',Validators.required)    
    } 
    this.formSal = this.fb.group(formControls);
  }

  get capacite() { return this.formSal.get('capacite') }
  get code() { return this.formSal.get('code') }
  get site() { return this.formSal.get('site') }

  ngOnInit()  {
   this.getAllSalles();
  }

  getAllSalles(){ 
    this.service.all().subscribe(data=>{ 
      this.salles = data;  
    },error=>{
      console.log("Error : "+error);
    });
  }


  openModal(targetModal, sal) {
    this.formSal.reset();
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static'
   });

   
  if(sal!=null){
    this.ids =  sal.codeSalle  ; 
    console.log("id salle : "+this.ids);
   this.formSal.patchValue({
    capacite: sal.capacite,
    site: sal.site ,
    code: sal.codeSalle 
   });
    }
  }


  edit() {
   this.modalService.dismissAll();
   console.log("res:", this.formSal.getRawValue());
   let data = this.formSal.value;  
    let sal = new Salle(this.ids, data.capacite, data.site);
    this.service.editt(sal).subscribe(data=>{
      console.log("RES -----> : "+data['RESPONSE']);
      if(data['RESPONSE']=="ERROR"){ 
        this.toastr.error('Erreur d\'ajout', 'Error',{timeOut: 2000});
      }else {   
        this.toastr.success('Salle Modifiée avec succès', 'Succès',{timeOut: 2000});
        this.salles = []; this.getAllSalles();  
      }
  }, error=>console.log("ERROR : "+error)); 
  }

   
  add() {
    this.modalService.dismissAll();
    console.log("res:", this.formSal.getRawValue());
    let data = this.formSal.value;  
     let sal = new Salle(data.code, data.capacite, data.site);
     this.service.add(sal).subscribe(data=>{
       console.log("RES -----> : "+data);
       if(data['RESPONSE']=="ERROR"){ 
         this.toastr.error('Erreur d\'ajout Salle existe Déja', 'Error',{timeOut: 2000});
       }else {   
         this.toastr.success('Salle ajouté avec succès', 'Succès',{timeOut: 2000});
         this.salles = []; this.getAllSalles(); 
       }
   }, error=>console.log("ERROR : "+error)); 
  } 

  supp(id){
    this.service.delete(id).subscribe(data=>{
      console.log("RES DELETE : "+data);
      if(data['RESPONSE']=="ERROR"){
        this.toastr.error('Erreur de suppression', 'Error',{timeOut: 2000});
      }else {  
        this.toastr.success('Salle supprimée avec succès', 'Succès',{timeOut: 2000});
        this.salles = []; this.getAllSalles();
      }
    }, error=>console.log("ERROR DELETE : "+error)); 
  }

}