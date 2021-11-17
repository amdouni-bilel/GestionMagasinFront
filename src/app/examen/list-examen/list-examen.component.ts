import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiExamenService } from 'src/app/services/api-examen.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-list-examen',
  templateUrl: './list-examen.component.html',
  styleUrls: ['./list-examen.component.css']
})
export class ListExamenComponent implements OnInit {
  exemens:any = [];
  term: string;
  constructor(private service:ApiExamenService, private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getAllExamens();
  }

  getDayName(date){
    console.log("date IS  ====> "+date);
    let newDate = new Date(date);
    let  weekdays = new Array(7);
        weekdays[0] = "Dimanche";
        weekdays[1] = "Lundi";
        weekdays[2] = "Mardi";
        weekdays[3] = "Mercredi";
        weekdays[4] = "Jeudi";
        weekdays[5] = "Vendredi";
        weekdays[6] = "Samedi";
        let r = weekdays[newDate.getDay()];
        console.log("DAY NAME IS  ====> "+r);
        return r ; 
  }


  getAllExamens(){
    this.service.all().subscribe(data=>{
      if(data['RESPONSE']!="ERREUR"){this.exemens = data;  }
    },error=>{
      console.log("Error : "+error);
    });
  }

  suppExamen(id){
    this.service.delete(id).subscribe(data=>{
      console.log("RES DELETE : "+data);
      if(data==true){
        this.toastr.success('Examen supprimée avec succès', 'Succès',{timeOut: 2000});
        this.exemens = []; this.getAllExamens();
      }else {
        this.toastr.error('Erreur de suppression', 'Error',{timeOut: 2000});
      }
    }, error=>console.log("ERROR DELETE : "+error));
  }
}
