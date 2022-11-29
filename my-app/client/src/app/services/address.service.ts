import { Injectable } from '@angular/core';
import {Address} from '../classes/address.class';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  currentSearch:string='';
  nearestPlaces:Array<Address>=[]

  constructor(private httpClient: HttpClient) {}

   search(searchText: string): Observable<Array<Address>> {
    this.currentSearch=searchText;
    return this.httpClient.get<Array<Address>>(`${environment.baseUrl}/places`, { params: { searchText }}).pipe(
      tap((result) => {
        this.nearestPlaces = result;
      })
    )
  }

  getPopularSearch(): Observable<{}> {
    return this.httpClient.get<any>(`${environment.baseUrl}/popular-search`).pipe(
      map(res =>{ return {search :res.search, counter:res.counter}} )
    );
  }


}
