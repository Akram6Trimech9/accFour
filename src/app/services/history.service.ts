import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historique } from '../models/historique';
import { ApiRoutes } from '../ts/enum';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private _http:HttpClient) { }

  getAllCreditHistory(pageSize: number, page: number, query?: string, startDate?: Date, endDate?: Date): Observable<{ success: boolean, data: Historique[], totalItems: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (query) {
      params = params.set('query', query);
    }
    if (startDate && endDate) {
      params = params.set('startDate', startDate.toISOString())
                     .set('endDate', endDate.toISOString());
    }

    return this._http.get<{ success: boolean, data: Historique[], totalItems: number }>(ApiRoutes.historique, { params });
  }

  searchHistorique(query: string): Observable<{ success: boolean, data: Historique[] }> {
    const params = new HttpParams().set('query', query);
    return this._http.get<{ success: boolean, data: Historique[] }>(`${ApiRoutes.historique}search`, { params });
  }
  deleteHistorique(id: any): Observable<any> {
     return this._http.delete<any>(`${ApiRoutes.historique}${id}` );
  }
}
