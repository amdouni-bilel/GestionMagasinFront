import {Esp_dept} from "./esp_dept";

export class Enseignant {

    constructor(
        private idEns?: string ,
        private nom?: string ,
        private prenom?: string ,
        private typeEns?: string,
        private tel?: number ,
        private sex?: string ,
        private mail?: string ,
        private nbrsurveillance?: number ,
        private nbrHeursurveillance?: number , 
        private esp_dept?: number ,


){}
}
