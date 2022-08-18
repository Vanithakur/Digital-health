import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import data from 'src/assets/data/network.json';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TestService {
    networkData: any = data;

    constructor(private http: HttpClient) {}

    public baseUrl = environment.apiUrl;

    public getNetworkData() {}

    public getViewData(): Observable<any> {
        return this.http.get<any>('./assets/data/view-data.json');
    }
}
