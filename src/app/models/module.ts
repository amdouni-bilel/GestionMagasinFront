/*import { Classe } from './classe';
import { Enseignant } from './enseignant';*/
/*import {Classe} from "./classe";
import {Enseignant} from './enseignant';*/


export class Module {

    constructor(
        private codeModule?: String ,
        private designation?: string ,
        private nbrHeures?: number ,
        private coefficient?: number ,
        private typeEpreuve?: string ,
        private semestre?: string ,
        private periode?: string ,
         private classe?: string,
        private enseignant?: string ,
        )
    {}
}
