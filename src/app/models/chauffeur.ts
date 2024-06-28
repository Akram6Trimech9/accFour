import { Fournisseur } from "./fournisseur";

export interface Chauffeur {
  _id?: string;
  firstName: string;
  cin: string;
  mobile: string;
  lastName: string;
  email: string;
  transportName: string;
  transportSerie: string;
  photo?: string;
  fournisseurs?: Fournisseur[];
  selected?: boolean;

}
