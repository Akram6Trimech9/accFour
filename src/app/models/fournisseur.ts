import { Chauffeur } from "./chauffeur";

export interface Fournisseur {
  _id?: string;
  firstName: string;
  cin: string;
  mobile: string;
  lastName: string;
  email: string;
  address: string;
  credit: number;
  photo?: string;
  chauffeur?: Chauffeur;
  creditHistory?: string[];
}
