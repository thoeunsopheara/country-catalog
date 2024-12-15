import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryResponse } from './types/response';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

  getAllCountries(search?: string): Observable<CountryResponse[]> {
    if (!search) return this.http.get<CountryResponse[]>('https://restcountries.com/v3.1/all');
    return this.http.get<CountryResponse[]>(`https://restcountries.com/v3.1/name/${search}`);
  }
}
