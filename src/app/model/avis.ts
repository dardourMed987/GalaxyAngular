import { Livrable } from "./livrable";
import { User } from "./user";

export class avis {
  id!: number;
  texteAvis!: string;
  dateAvis!: Date;
  utilisateur!:User;
  livrable!:Livrable
}
