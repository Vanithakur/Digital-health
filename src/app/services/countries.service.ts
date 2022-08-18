import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    constructor(private http: HttpClient) {}

    public baseUrl = environment.baseUrl;

    public getCountries(): Observable<any> {
       return this.http.get(this.baseUrl + 'ndhs-master/countryList');
    }
}
