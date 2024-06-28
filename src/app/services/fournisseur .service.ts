import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from '../models/fournisseur';
import { ApiRoutes } from '../ts/enum';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  constructor(private _http:HttpClient) { }

  postFournisseur(fournisseur : any , idChauffeur:any):Observable<Fournisseur>{
     return this._http.post<Fournisseur>(`${ApiRoutes.fournisseur}${idChauffeur}`,fournisseur)
  }
  getAllFournisseur(size: number, currentPage: number): Observable<{ success: boolean, data: Fournisseur[] , totalItems:number }> {
    const params = new HttpParams()
      .set('page', currentPage.toString())
      .set('pageSize', size.toString());

    return this._http.get<{ success: boolean, data: Fournisseur[] , totalItems:number  }>(ApiRoutes.fournisseur, { params });
  }
  searchFournisseurs(query: string): Observable<{ success: boolean, data: Fournisseur[] }> {
    const params = new HttpParams().set('query', query);
    return this._http.get<{ success: boolean, data: Fournisseur[] }>(`${ApiRoutes.fournisseur}search`, { params });
  }
  updateFournisseur(fournisseur:any , id:any): Observable<{ success: boolean, data: Fournisseur }> {
     return this._http.patch<{ success: boolean, data: Fournisseur }>(`${ApiRoutes.fournisseur}${id}`, fournisseur);
  }
  deleteFournisseur(id:any): Observable<{ success: boolean, message: string }> {
    return this._http.delete<{ success: boolean,  message: string }>(`${ApiRoutes.fournisseur}${id}`);
 }
 getOne(id:any) :Observable<{ success: boolean, data: Fournisseur }>{
  return this._http.get<{ success: boolean, data: Fournisseur }>(`${ApiRoutes.fournisseur}${id}`);
 }
 updateCredit(credit:any , id:any): Observable<{ success: boolean, data: Fournisseur }> {
  return this._http.patch<{ success: boolean, data: Fournisseur }>(`${ApiRoutes.fournisseur}credit/${id}`, credit);
}
}
