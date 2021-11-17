import { Component, OnInit } from '@angular/core';
import { ApiEnseignantService } from '../../services/api-enseignant.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-enseignant',
  templateUrl: './list-enseignant.component.html',
  styleUrls: ['./list-enseignant.component.css']
})
export class ListEnseignantComponent implements OnInit {
  enseignants:any = [];
  term: string;
  constructor(private service:ApiEnseignantService, private toastr: ToastrService){
  }

  ngOnInit(): void {  
    this.getAllEnseignants();
  }
 

  getAllEnseignants(){ 
    this.service.all().subscribe(data=>{ 
      if(data['RESPONSE']!="ERREUR"){this.enseignants = data;  } 
    },error=>{
      console.log("Error : "+error);
    });
  }

  suppEnseignant(id){
    this.service.delete(id).subscribe(data=>{
      console.log("RES DELETE : "+data);
      if(data==true){
        this.toastr.success('Enseignant supprimée avec succès', 'Succès',{timeOut: 2000});
        this.enseignants = []; this.getAllEnseignants();
      }else {  
        this.toastr.error('Erreur de suppression', 'Error',{timeOut: 2000});
      }
    }, error=>console.log("ERROR DELETE : "+error)); 
  }
}