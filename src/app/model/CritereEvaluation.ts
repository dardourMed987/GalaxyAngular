import { Critere } from "./critere";


export class CritereEvaluation {
  id!: number;
  note!: number;
  commentaire!:String;
  critere!:Critere;

  constructor(critere:Critere)
  {
    this.critere=critere;
  }
 
}
