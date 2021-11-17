import { Classe } from './classe';

export class Etudiant {

  constructor(
    private idEtudiant?: string ,
    private cin?: number ,
    private nom?: string ,
    private prenom?: string ,
    private mailEtud?: string ,
    private classe?: string ,
  ){}
}
