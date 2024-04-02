import { Livrable } from "./livrable";
import { User } from "./user";
import { message } from "./message";
import { Sujet } from "./sujet";

export class discussion {
  id!: number;
  messages!: message[];
  sujet!: Sujet;
  utilisateur!:User


  
}
