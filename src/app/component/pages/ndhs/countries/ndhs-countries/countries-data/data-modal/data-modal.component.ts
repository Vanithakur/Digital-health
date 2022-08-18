import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-data-modal',
    templateUrl: './data-modal.component.html',
    styleUrls: ['./data-modal.component.css'],
})
export class DataModalComponent implements OnInit {
    ndhs_details:any=[];
    entries:any;
    constructor(
        private _common: CommonService,
        public dialogRef: MatDialogRef<DataModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        // console.log(this.data);

        this._common.getTaxonomyViewData(this.data.governance_id,this.data.development_id,this.data.taxonomy_id,this.data.country_id,this.data.year).subscribe((result) => {
            this.entries = Object.entries(result);
            let viewDeatils :any;
            let development_type :any;
            let country_name :any;
            let ultimate_type :any;
            let ultimates :any = [];
            let taxonomy :any = [];
            let taxonomy1 :any = [];
            let indicator :any;
            let indicators :any = [];
            let taxonomyName:any;
            let questions:any = [];
            this.entries.forEach(function (element: any, index: any) {
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
                                                        element6[1].forEach(function (element7: any, index7: any) {
                                                            country_name = element7.countries_name;
                                                            questions.push(element7)
                                                        });
                                                        indicators.push({
                                                            name:indicator,
                                                            questions:questions
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
                                    viewDeatils = {...viewDeatils,ultimates, country_name:country_name}
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
                                                        element6[1].forEach(function (element7: any, index7: any) {
                                                            country_name = element7.countries_name;
                                                            questions.push(element7)
                                                        });
                                                        indicators.push({
                                                            name:indicator,
                                                            questions:questions
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
                                    viewDeatils = {...viewDeatils,ultimates, country_name:country_name}
                                })
                            }
                        });
                    }
                });
            });
            this.ndhs_details.push(viewDeatils);
            //console.log(this.ndhs_details)
        });
    }
}
