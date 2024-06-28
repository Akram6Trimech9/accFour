import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chauffeur } from '../models/chauffeur';
import { ApiRoutes } from '../ts/enum';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {

  constructor(private _http:HttpClient) { }

  postChauffeur(chauffeur : any):Observable<Chauffeur>{
     return this._http.post<Chauffeur>(ApiRoutes.chauffeur,chauffeur)
  }
  getAllChauffeurs(size: number, currentPage: number): Observable<{ success: boolean, data: Chauffeur[] , totalItems:number }> {
    const params = new HttpParams()
      .set('page', currentPage.toString())
      .set('pageSize', size.toString());

    return this._http.get<{ success: boolean, data: Chauffeur[] , totalItems:number  }>(ApiRoutes.chauffeur, { params });
  }
  getAll( ): Observable<{ success: boolean, data: Chauffeur[] }> {
 
    return this._http.get<{ success: boolean, data: Chauffeur[]  }>(`${ApiRoutes.chauffeur}allChauf` );
  }
  searchChauffeurs(query: string): Observable<{ success: boolean, data: Chauffeur[] }> {
    const params = new HttpParams().set('query', query);
    return this._http.get<{ success: boolean, data: Chauffeur[] }>(`${ApiRoutes.chauffeur}search`, { params });
  }
  updateChauffeur(chauffeur:any , id:any): Observable<{ success: boolean, data: Chauffeur }> {
     return this._http.patch<{ success: boolean, data: Chauffeur }>(`${ApiRoutes.chauffeur}${id}`, chauffeur);
  }
  deleteChauffeur(id:any): Observable<{ success: boolean, message: string }> {
    return this._http.delete<{ success: boolean,  message: string }>(`${ApiRoutes.chauffeur}${id}`);
 }
 getOne(id:any) :Observable<{ success: boolean, data: Chauffeur }>{
  return this._http.get<{ success: boolean, data: Chauffeur }>(`${ApiRoutes.chauffeur}${id}`);
 }
}
