import { CritereEvaluation } from "./CritereEvaluation";
import { Livrable } from "./livrable";
import { User } from "./user";


export class EvaluationLivrable {
  id!: number;
  note!: number;
  commentaire!:string;
  livrable!:Livrable;
  critereEvaluations!:CritereEvaluation[];
  utilisateur!:User
  dateAjout:Date;
  

  constructor(note:number,commentaire:string,livrable:Livrable,critereEvaluations:CritereEvaluation[],utilisateur:User)
  {
    this.note=note;
    this.commentaire=commentaire;
    this.livrable=livrable;
    this.critereEvaluations=critereEvaluations;
    this.utilisateur=utilisateur;
  }

  
 
}
