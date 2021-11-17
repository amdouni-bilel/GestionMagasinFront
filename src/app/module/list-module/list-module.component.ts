import { Component, OnInit } from '@angular/core';
import { ApiModuleService } from 'src/app/services/api-module.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-module',
  templateUrl: './list-module.component.html',
  styleUrls: ['./list-module.component.css']
})
export class ListModuleComponent implements OnInit {
  modules:any = [];
  term: string;
  constructor(private service:ApiModuleService, private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getAllModules();
  }


  getAllModules(){
    this.service.all().subscribe(data=>{
      if(data['RESPONSE']!="ERREUR"){this.modules = data;  }
    },error=>{
      console.log("Error : "+error);
    });
  }

  suppModule(id){
    this.service.delete(id).subscribe(data=>{
      console.log("RES DELETE : "+data);
      if(data==true){
        this.toastr.success('Module supprimée avec succès', 'Succès',{timeOut: 2000});
        this.modules = []; this.getAllModules();
      }else {
        this.toastr.error('Erreur de suppression', 'Error',{timeOut: 2000});
      }
    }, error=>console.log("ERROR DELETE : "+error));
  }
}
