/*import {Anneeuniversitaire} from "./anneeuniversitaire";
import {Classe} from "./classe";
import {Enseignant} from "./enseignant";
import {Module} from "./module";
import {Salle} from "./salle";*/
export class Examen {

    constructor(
        private idExamen?: number , 
        private dateEx?: Date ,
        private heureEx?: string ,
        private dureeEx?: string ,
        private dsex?: number ,
        private semestre?: string ,
        private session?: string ,
        private typeEx?: string  ,
 
        private classe?: string ,
        private espModule?: number ,
        private enseignant?: number ,
        private salle?: string ,
        private groupe?: string ,
     ){}
}


