import { Chauffeur } from "./chauffeur";
import { Fournisseur } from "./fournisseur";

export interface Historique {
  _id?: string;
  fournisseur: Fournisseur;
  amount:  number;
  method: string;
  type:string;
  createdAt:Date
}
