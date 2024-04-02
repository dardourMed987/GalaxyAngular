import { client } from "./client";
import { Livrable } from "./livrable";
import { User } from "./user";

export class ClientLivrableHistory {
  id!: number;
  dateenvoie!: Date;
  client!: client;
  livrable!:Livrable;
}
