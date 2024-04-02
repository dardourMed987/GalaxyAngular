import { ClientLivrableHistory } from "./ClientLivrableHistory";
import { Livrable } from "./livrable";
import { User } from "./user";

export class client {
  id!: number;
  nom!: string;
  prenom!: Date;
  raisonSociale!:string
  email!:User;
  clientLivrableHistories!:ClientLivrableHistory[];
}
