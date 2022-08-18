import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import { EChartsOption } from 'echarts';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'app-comparative-result-detail',
    templateUrl: './comparative-result-detail.component.html',
    styleUrls: ['./comparative-result-detail.component.css'],
})
export class ComparativeResultDetailComponent implements OnInit, OnDestroy {
    toppings = new FormControl();
    panelOpenState = false;
    step = 0;
    stepinner = 0;
    comparative_tables : any;
    comparitive_countries: any = [];
    ultimate_type:any;
    present_details:any=[];
    prospective_details:any=[];
    availability_details:any=[];
    readiness_details:any=[];
    capacity_building:any=[];
    development_strategy:any=[];
    taxonomy_name:any;
    development_name:any;
    entries:any;
    year:any;
    governance:any;
    developmentId:any;
    ultimateId:any;
    country_list:any;
    ultimate_field:any;
    taxonomy_id:number = 0;
    dash_array:any;
    mySelections: any=[];
    countries:any;
    triggerInit: boolean = true;
    setStep(index: number) {
        this.step = index;
    }

    setStepInner(index: number) {
        this.stepinner = index;
    }

    BarChartOptions: any;
    default_contry_list:any;
    showloader:boolean = true;
    @ViewChild('mySelect') mySelect: ElementRef | any;

    constructor(private location: Location, private _common: CommonService,private _utilities: UtilitiesService, ) {}
    public ngOnInit() {
        this._utilities.showHeaderMenu.next(true);

        this._utilities.governanceTypeSource.subscribe((governanceId) => {

            if (this.triggerInit) {
                let self = this;
                this.dash_array = [1,2,3,4,5];
                this.ultimateId = environment.default_ultimate_id;
                this.developmentId = environment.default_development_id;
                this._utilities.yearSource.subscribe((message: any) => {
                    this.year = message;
                    if(localStorage.getItem("selected_country")){
                        this.countries = localStorage.getItem("selected_country");
                      }else{
                        if(this.year == 2022){
                            this.countries = environment.default_country_2022;
                        }else{
                            this.countries =  environment.default_country_2021;
                        }
                    }
                })

                this._utilities.governanceTypeSource.subscribe((message: any) => {
                    this.governance = message;
                })

                let data = {
                    year:this.year
                };

                this._common.getExistedCountries(data).subscribe((result) => {
                    this.country_list = result;
                })

                let default_contry = {
                    countries:this.countries
                }

                this._common.getdefaultCountry(default_contry).subscribe((result) => {
                    this.default_contry_list = result;
                    let selectedOption:any= [];
                    self.mySelections = [];
                    result.forEach(function (element: any, index: any) {
                        selectedOption.push(element.country_id)
                        self.mySelections.push(element.country_id);

                    })
                    this.toppings.setValue(selectedOption);
                })

                $(document).ready(function () {
                    $('.vertical-tab-area').toggleClass('open');
                    $('.main-li li:first').addClass('active');
                    $('.main-li ul li:first').addClass('activelink');
                    $('.toggle-tab-button > button').on('click', function () {
                        $('.vertical-tab-area').toggleClass('open');
                    });
                    $('.sub-category li, .parent-li').click(function () {
                        $('.sub-category li, .parent-li').removeClass('activelink');
                        $(this).addClass('activelink');
                        var tagid = $(this).data('tag');
                        $('.list').removeClass('active').addClass('hide');
                        $('#' + tagid).addClass('active').removeClass('hide');
                    });
                });
                this.comparativeOverviewDetails();
                this.comparativeInformationChart();
                this.topcountriesChart();
            }
        });

    }

    toggleProspective(event:any){
        setTimeout(() => {
            $('#prospective_development li:first').addClass('active');
            $('#prospective_development ul li:first').addClass('activelink');
            this.ultimateSelection(2,4);
        }, 100);
       
    }

    togglePresent(event:any){
        setTimeout(() => {
            $('#present_development li:first').addClass('active');
            $('#present_development ul li:first').addClass('activelink');
            this.ultimateSelection(1,2);
        }, 100);
       
    }

    dropDown2() {
        $('.toggleSubmenu2').next('ul').toggleClass('show');
    }

    dropDown1() {
        $('.toggleSubmenu1').next('ul').toggleClass('show');
    }

    isValue: number = 0;

    toggle(num: number) {
        this.isValue = num;
    }

    handlePrint() {
        window.print();
    }

    previousPage() {
        this.location.back();
    }

    ultimateSelection(development_id:number,ultimate_id:number){
        this.developmentId = development_id;
        this.ultimateId = ultimate_id;
        this.comparativeInformationChart();
    }

    topCityChart(taxonomy_id:number){
        this.taxonomy_id = taxonomy_id;
        this.topcountriesChart();
    }

    comparativeOverviewDetails(){
        this.showloader = true;
        this.present_details = [];
        this.prospective_details = [];
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if(selected_years && selected_years.length == 2){
            selectedYear = selected_years.toString();
        }
        let data = {
            countries: this.countries,
            governances:this.governance,
            year:selectedYear
        };
        this._common.getComparativeOverview(data).subscribe((result) => {
            this.entries = Object.entries(result);
            let present_detail =  this.formate_data(this.entries[0]);
            let prospective_detail = this.formate_data(this.entries[1]);
            this.present_details.push(present_detail);
            this.prospective_details.push(prospective_detail);
            this.availability_details = this.present_details[0].ultimates[0].taxonomy;
            this.readiness_details = this.present_details[0].ultimates[1].taxonomy;
            this.capacity_building = this.prospective_details[0].ultimates[0].taxonomy;
            this.development_strategy = this.prospective_details[0].ultimates[1].taxonomy;

        });
    }

    comparativeInformationChart(){
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if(selected_years && selected_years.length == 2){
            selectedYear = selected_years.toString();
        }
        
        let data = {
            countries: this.countries,
            developmentId:this.developmentId,
            ultimateId:this.ultimateId,
            governanceId:this.governance,
            year:selectedYear
        };
        this.comparitive_countries = [];
        this._common.getComparativeInformation(data).subscribe((result) => {
            this.comparative_tables = result;
            this.development_name = result[0].development_type;
            result.filter((item: any, index:any ) => {
                this.ultimate_type = item.ultimate_field;
                if (index == 0 ){
                    this.taxonomy_id = item.taxonomy_id;
                    this.topcountriesChart();
                }
                if (!this.comparitive_countries.includes(item.country)) {
                    this.comparitive_countries.push(item.country);
                }
            })
            this.showloader = false;
        });
    }

    topcountriesChart(){
        let taxonomy:any;
        if(this.taxonomy_id == 0){
            taxonomy = (this.governance == 1)? environment.default_taxonomy_general:environment.default_taxonomy_digital;
        }else{
            taxonomy = this.taxonomy_id;
        }
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if(selected_years && selected_years.length == 2){
            selectedYear = selected_years.toString();
        }

        let data = {
            taxonomyId:taxonomy,
            developmentId:this.developmentId,
            ultimateId:this.ultimateId,
            governances:this.governance,
            year:selectedYear
        };
        let self = this;
        this._common.getTopCountriesData(data).subscribe((result) => {
            let taxonomy_name:any;
            let source:any = [];
            let re_aaray :any = [];
            result.forEach(function (element: any, index: any) {
                self.ultimate_field = element.ultimate_field;
                taxonomy_name = element.taxonomy_name;
                if (index == 0 ){
                    re_aaray.push( 'label', element.ultimate_field);
                    source.push(re_aaray)
                    re_aaray = [];
                }
                re_aaray.push( element.country_name, element.score);
                source.push(re_aaray)
                re_aaray = [];
            });

            let option = {
                title: {
                    text: taxonomy_name,
                    textStyle: {
                        fontSize: 12
                    }
                },
                legend: {
                    orient: 'vertical',
                    right: 0,
                    top: 0, 
                    textStyle: {
                        fontSize: 11
                    }
                },
                tooltip: {},
                dataset: {
                    source: source,
                },
                xAxis: {
                    type: "category",
                    axisLabel: {
                      interval: 0,
                      rotate: 30,
                      textStyle: {
                        fontSize: 10
                    }
                    },
                    // axisLabel: {
                    //     width: 100, //fixed number of pixels
                    //     overflow: 'truncate', // or 'break' to continue in a new line
                    //     interval: 0,
                    //   },
                },
                yAxis: {},
                // series: [{ type: 'bar' }],
                series: [
                    {
                      type: 'bar',
                      itemStyle: {
                        borderRadius : [6, 6, 0, 0], // Specify the border radius
                      },
                    },
                  ],
                grid: { containLabel: true },
            };
            this.BarChartOptions = option;
        });
    }

    formate_data(data:any){
        let viewDeatils :any;
        let development_type :any;
        let country_name :any;
        let ultimate_type :any;
        let ultimates :any = [];
        let taxonomy :any=[];
        let taxonomy1 :any=[];
        let indicator :any;
        let indicators :any=[];
        let taxonomyName:any;
        let questions:any=[];
        let entries = [];
        let countries: any =[];
        let country: any =[];
        let indicator_score:any=[];
        entries.push(data);
        entries.forEach(function (element: any, index: any) {
            element.forEach(function (element1: any, index1: any) {
                if(index1 ==  0){
                    development_type = element1;
                }else{
                    Object.entries(element1).forEach(function (element2: any, index2: any) {
                        if(index2 == 0){
                            element2.forEach(function (element3: any, index3: any) {
                                if(index3 ==  0){
                                    ultimate_type = element3;
                                    viewDeatils = {...viewDeatils,development_type: development_type}
                                }else{
                                    Object.entries(element3).forEach(function (element4: any, index4: any) {
                                        element4.forEach(function (element5: any, index5: any) {
                                            if(index5 ==  0){
                                                taxonomyName = element5;
                                            }else{
                                                indicators = [];
                                                Object.entries(element5).forEach(function (element6: any, index6: any) {
                                                    questions = [];
                                                    indicator = element6[0];
                                                    countries = [];
                                                    indicator_score = [];
                                                    let actual_score1:any;
                                                    let actual_score2:any;
                                                    let question_status1:any;
                                                    let question_status2:any;
                                                    let indicator_score1:any;
                                                    let indicator_score2:any;
                                                    let country_percantag1:any;
                                                    let country_percantag2:any;
                                                    Object.entries(element6[1]).forEach(function (element7: any, index7: any) {
                                                        let question_name :any;
                                                        element7.forEach(function (element8: any, index8: any) {

                                                            if(index8 == 0){
                                                                question_name = element8;
                                                            }else{
                                                                element8.forEach(function (element9: any, index9: any) {
                                                                    if(index9 == 0){
                                                                        question_status1 = element9.status;
                                                                        actual_score1 += element9.actual_score;
                                                                        indicator_score1 = element9.indicator_score;
                                                                    }else{
                                                                        actual_score2 += element9.actual_score;
                                                                        question_status2 = element9.status;
                                                                        indicator_score2 = element9.indicator_score;
                                                                    }
                                                                    if (!countries.includes(element9.c_name)) {
                                                                        countries.push(element9.c_name);
                                                                    }
                                                                })
                                                            }
                                                        });

                                                        let ques = {
                                                            name: question_name,
                                                            question_status1:question_status1,
                                                            question_status2:question_status2
                                                        }
                                                        questions.push(ques);
                                                    });

                                                    country_percantag1 = Math.round(Math.round((actual_score1/indicator_score1)* 100)/20);
                                                    country_percantag2 = Math.round(Math.round((actual_score2/indicator_score2)* 100)/20);
                                                    let score = {
                                                        country_1:countries[0],
                                                        country_2:countries[1],
                                                        indicator_score1:indicator_score1,
                                                        actual_score1:actual_score1,
                                                        indicator_score2:indicator_score2,
                                                        actual_score2:actual_score2,
                                                        country_percantag1:country_percantag1,
                                                        country_percantag2:country_percantag2
                                                    }
                                                    indicator_score.push(score);
                                                    indicators.push({
                                                        name:indicator,
                                                        questions:questions,
                                                        countries:countries,
                                                        score:indicator_score
                                                    })
                                                });
                                            }
                                            if(index5 == 1 ){
                                                taxonomy.push({
                                                    name:taxonomyName,
                                                    indicator:indicators
                                                })
                                            }
                                        })
                                    });
                                }
                                if(index3 ==  0){
                                    ultimates.push({
                                        name:ultimate_type,
                                        taxonomy:taxonomy
                                    })
                                }
                                ultimates.sort(function(a:any,b:any) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
                                viewDeatils = {...viewDeatils,ultimates}
                            })
                        }else if(index2 == 1){
                            element2.forEach(function (element3: any, index3: any) {
                                if(index3 ==  0){
                                    ultimate_type = element3;
                                    viewDeatils = {...viewDeatils,development_type: development_type}
                                }else{
                                    Object.entries(element3).forEach(function (element4: any, index4: any) {
                                        element4.forEach(function (element5: any, index5: any) {
                                            if(index5 ==  0){
                                                taxonomyName = element5;
                                            }else{
                                                indicators = [];
                                                Object.entries(element5).forEach(function (element6: any, index6: any) {
                                                    questions = [];
                                                    indicator = element6[0];
                                                    countries = [];
                                                    indicator_score = [];
                                                    let actual_score1 = 0;
                                                    let actual_score2 = 0;
                                                    let question_status1:any;
                                                    let question_status2:any;
                                                    let indicator_score1:any;
                                                    let indicator_score2:any;
                                                    let country_percantag1:any;
                                                    let country_percantag2:any;
                                                    Object.entries(element6[1]).forEach(function (element7: any, index7: any) {
                                                        let question_name :any;
                                                        element7.forEach(function (element8: any, index8: any) {
                                                            if(index8 == 0){
                                                                question_name = element8;
                                                            }else{
                                                                element8.forEach(function (element9: any, index9: any) {
                                                                    if(index9 == 0){
                                                                        question_status1 = element9.status;
                                                                        actual_score1 += element9.actual_score;
                                                                        indicator_score1 = element9.indicator_score;
                                                                    }else{
                                                                        actual_score2 += element9.actual_score;
                                                                        question_status2 = element9.status;
                                                                        indicator_score2 = element9.indicator_score;
                                                                    }
                                                                    if (!countries.includes(element9.c_name)) {
                                                                        countries.push(element9.c_name);
                                                                    }
                                                                })
                                                            }
                                                        });

                                                        let ques = {
                                                            name: question_name,
                                                            question_status1:question_status1,
                                                            question_status2:question_status2
                                                        }
                                                        questions.push(ques);
                                                    });

                                                    country_percantag1 = Math.round(Math.round((actual_score1/indicator_score1)* 100)/20);
                                                    country_percantag2 = Math.round(Math.round((actual_score2/indicator_score2)* 100)/20);
                                                    let score = {
                                                        country_1:countries[0],
                                                        country_2:countries[1],
                                                        indicator_score1:indicator_score1,
                                                        actual_score1:actual_score1,
                                                        indicator_score2:indicator_score2,
                                                        actual_score2:actual_score2,
                                                        country_percantag1:country_percantag1,
                                                        country_percantag2:country_percantag2
                                                    }
                                                    indicator_score.push(score);
                                                    indicators.push({
                                                        name:indicator,
                                                        questions:questions,
                                                        countries:countries,
                                                        score:indicator_score
                                                    })
                                                });
                                            }
                                            if(index5 == 1 ){
                                                taxonomy1.push({
                                                    name:taxonomyName,
                                                    indicator:indicators
                                                })
                                            }
                                        })
                                    });
                                }
                                if(index3 ==  0){
                                    ultimates.push({
                                        name:ultimate_type,
                                        taxonomy:taxonomy1
                                    })
                                }
                                ultimates.sort(function(a:any,b:any) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
                                viewDeatils = {...viewDeatils,ultimates}
                            })
                        }
                    });
                }
            });
        });
        return viewDeatils;
    }

    doSomething(event:any){
        if (this.toppings.value.length < 3) {
            this.mySelections = this.toppings.value;
            setTimeout(() => {
                if(this.mySelections.length ==  2){
                    this.countries = this.mySelections.toString();
                    this.comparativeOverviewDetails();
                    this.comparativeInformationChart();
                    this.topcountriesChart()
                    localStorage.removeItem('selected_country');
                    localStorage.setItem("selected_country", this.countries);
                    this.mySelect.close();
                }
            }, 1500);
          } else {
            if (this.toppings.value.length == 3){
                let index = this.toppings.value.indexOf(this.mySelections[0]);
                if(index == 0){
                    this.toppings.value.shift();
                }else{
                    this.toppings.value.pop();
                }
                this.mySelections = this.toppings.value;
                setTimeout(() => {
                    if(this.mySelections.length ==  2){
                        this.countries = this.mySelections.toString();
                        this.comparativeOverviewDetails();
                        this.comparativeInformationChart();
                        this.topcountriesChart()
                        localStorage.removeItem('selected_country');
                        localStorage.setItem("selected_country", this.countries);
                        this.mySelect.close();
                    }
                }, 1500);
            }
            this.toppings.setValue(this.mySelections);
        }
    }

    compare(c1: {name: string}, c2: {name: string}) {
        return c1 && c2 && c1.name === c2.name;
    }

    ngOnDestroy(): void {
        this._utilities.governanceTypeSource.unsubscribe;
        this.triggerInit = false;
    }
}
