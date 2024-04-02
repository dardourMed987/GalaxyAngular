import { Livrable } from "./livrable";
import { Sujet } from "./sujet";
import { User } from "./user";

export class notification {
  id!: number;
  message!: string;
  utilisateur!:User;
  sujet!:Sujet
  type!: string
  statut!:number
  livrable!:Livrable

}
