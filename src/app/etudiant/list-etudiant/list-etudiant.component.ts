import { Component, OnInit } from '@angular/core';
import { ApiEtudiantService } from 'src/app/services/api-etudiant.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-etudiant',
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css']
})
export class ListEtudiantComponent implements OnInit {
  etudiants:any = [];
  term: string;
  constructor(private service:ApiEtudiantService, private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getAllSudents();
  }


  getAllSudents(){
    this.service.all().subscribe(data=>{
      if(data['RESPONSE']!="ERREUR"){this.etudiants = data;  }
    },error=>{
      console.log("Error : "+error);
    });
  }

  suppStudent(id){
    this.service.delete(id).subscribe(data=>{
      console.log("RES DELETE : "+data);
      if(data==true){
        this.toastr.success('Etudiant supprimée avec succès', 'Succès',{timeOut: 2000});
        this.etudiants = []; this.getAllSudents();
      }else {
        this.toastr.error('Erreur de suppression', 'Error',{timeOut: 2000});
      }
    }, error=>console.log("ERROR DELETE : "+error));
  }
}
