import {Anneeuniversitaire} from "./anneeuniversitaire";
import {Esp_dept} from "./esp_dept";

export class Classe {

    constructor(
      private codeCL?: string ,
      private libelleCL?: string ,
      private nbrEtudiant?: number ,
      private specialite?: string ,
      private  mail?: string   ,
      private  groupe?: string ,

      private anneeuniversitaire?: number,
      private  esp_dept?: number ,

  ){}
}
