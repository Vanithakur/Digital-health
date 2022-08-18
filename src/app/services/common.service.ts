import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    constructor(private http: HttpClient) {}

    public baseUrl = environment.baseUrl;

    public getNdhsDetails(
        governance_id: number,
        country_id: number,
        year: number
    ): Observable<any> {
        return this.http.get(
            this.baseUrl +
                'ndhs-master/details/' +
                governance_id +
                '/' +
                country_id +
                '/' +
                year
        );
        //return this.http.get<any>('./assets/data/countries.json');
    }

    public getViewData(
        governance_id: number,
        development_id: number,
        country_id: number,
        year: number
    ): Observable<any> {
        return this.http.get(
            this.baseUrl +
                'ndhs-master/view-detail/' +
                governance_id +
                '/' +
                development_id +
                '/' +
                country_id +
                '/' +
                year
        );
    }

    public getTaxonomyViewData(
        governance_id: number,
        development_id: number,
        taxonomy_id: number,
        country_id: number,
        year: number
    ): Observable<any> {
        return this.http.get(
            this.baseUrl +
                'ndhs-master/taxnomy-detail/' +
                governance_id +
                '/' +
                development_id +
                '/' +
                taxonomy_id +
                '/' +
                country_id +
                '/' +
                year
        );
    }

    public getNdhsViewDetail(
        governance_id: number,
        ultimate_field_id: number,
        development_id: number,
        country_id: number,
        year: number
    ): Observable<any> {
        return this.http.get(
            this.baseUrl +
                'ndhs-master/view-detail/' +
                governance_id +
                '/' +
                ultimate_field_id +
                '/' +
                development_id +
                '/' +
                country_id +
                '/' +
                year
        );
    }

    public getComparative(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/comparative', data);
    }

    public getComparativeInformation(data: any): Observable<any> {
        return this.http.post(
            this.baseUrl + 'ndhs-master/comparative-information',
            data
        );
    }

    public getComparativeOverview(data: any): Observable<any> {
        return this.http.post(
            this.baseUrl + 'ndhs-master/comparative-overview',
            data
        );
    }

    public getTopCountriesData(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/top-countries', data);
    }

    public getExistedCountries(data: any): Observable<any> {       
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || "")
        if(selected_years && selected_years.length == 2){
            return this.http.get(this.baseUrl + 'ndhs-master/existed-countries-list' );
        }else{
            return this.http.post(
                this.baseUrl + 'ndhs-master/existed-countries-list',
                data
            );
        }        
    }

    public getAllCountries(): Observable<any> {
        return this.http.get(this.baseUrl + 'ndhs-master/existed-countries-list' );
    }

    public getTaxonomyTabledetails(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/table-chart', data);
    }

    public getOverviewBarChart(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/bar-chart', data);
    }

    public getOverviewBubbleChart(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/bubble-chart', data);
    }

    public getOverviewRadarChart(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/radar-chart', data);
    }

    public getdefaultCountry(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'ndhs-master/default-country', data);
    }

    
}
