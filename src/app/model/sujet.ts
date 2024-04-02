import { Profile } from './Profile';
import { discussion } from './discussion';
import { DocumentProjet } from './document-projet';

export class Sujet extends DocumentProjet {
  description!: string;
  functionality!: string;
  stackTechnique!: string;
  expectedDelivery!: string;
  developerRating!: string;
  statut!:number;
  profile!:Profile;
  discussion:discussion;
  // Des variables que l'on utilise lorsque le sujet est affecté.
  dateDebut!:Date;
  dateFin!:Date;

}
