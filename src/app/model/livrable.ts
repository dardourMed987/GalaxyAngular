import { EvaluationLivrable } from './EvaluationLivrable';
import { avis } from './avis';
import { DocumentProjet } from './document-projet';
import { Sujet } from './sujet';

export class Livrable extends DocumentProjet {
  repoName!: string;
  gitUrl!: string;
  avis!:avis[];
  sujet!:Sujet;
  evaluationLivrable!:EvaluationLivrable;
  statut!:number;
}
