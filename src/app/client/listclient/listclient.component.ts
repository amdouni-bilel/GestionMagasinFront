import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import  {Client} from "../../models/client";
import  {ApiClientService} from "../../services/api-client.service";

@Component({
  selector: 'app-listclient',
  templateUrl: './listclient.component.html',
  styleUrls: ['./listclient.component.css']
})
export class ListclientComponent implements OnInit {
  clients:any = [];
  term: string;
  constructor(private service:ApiClientService, private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getAllClients();
  }


  getAllClients(){
    this.service.all().subscribe(data=>{
      if(data['RESPONSE']!="ERREUR"){this.clients = data;  }
    },error=>{
      console.log("Error : "+error);
    });
  }

  suppClient(id){
    this.service.delete(id).subscribe(data=>{
      console.log("RES DELETE : "+data);
      if(data==true){
        this.toastr.success('Client supprimée avec succès', 'Succès',{timeOut: 2000});
        this.clients = []; this.getAllClients();
      }else {
        this.toastr.error('Erreur de suppression', 'Error',{timeOut: 2000});
      }
    }, error=>console.log("ERROR DELETE : "+error));
  }





}
  /*formSal: FormGroup;
  salles:any = [];
  ids : string ;
  constructor(private service:ApiClientService, private fb: FormBuilder, private modalService: NgbModal,
              private toastr: ToastrService, private router:Router) {
    let formControls = {
      nom: new FormControl('',Validators.required),
      prenom: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required) ,
      dateNaissance : new FormControl('',Validators.required) ,
      password : new FormControl('',Validators.required) ,

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

*/
