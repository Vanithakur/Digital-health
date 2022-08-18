
import {AfterViewInit, Component,  ElementRef, OnInit, ViewChild,} from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import * as echarts from 'echarts';
import data from 'src/assets/data/network2.json';
import { CountriesService } from 'src/app/services/countries.service';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'app-comparative-result',
    templateUrl: './comparative-result.component.html',
    styleUrls: ['./comparative-result.component.css'],
})
export class ComparativeResultComponent implements OnInit, AfterViewInit {
    networkData: any = data;
    mySelections: any=[];
    country_ids:any;
    toppings = new FormControl();
    countries_2021: any;
    countries_2022: any;
    selected_countries: any;
    comparitive_countries: any = [];
    readiness: any = [];
    availability: any = [];
    capacity_building: any = [];
    development_strategy: any = [];
    country_list: any;
    mapDataInfo: any = [];
    chart: any;
    pointSeries: any;
    year: any = ['2022'];
    countries: any = [];
    circleProperties: any;
    container: any;
    root: any;
    circle: any;
    bullet: any;
    bulletColors: any;
    currentYear: any;
    default_contry_list:any;

    @ViewChild('main') main: ElementRef | any;
    @ViewChild('mySelect') mySelect: ElementRef | any;
    // @ViewChild() selectedMapData: any;

    constructor(
        private _countries: CountriesService,
        private _common: CommonService,
        private _utilities: UtilitiesService,
    ) { }

    mapData(data: any,selected:any) {
        this.mapDataInfo = this.mapDataInfo.filter((entry2: any) => {                       
            if(!this.mySelections.includes(entry2.country_id)){
                return false
            }
            return true;
        });
        if (selected._selected) {
            this.mapDataInfo.push(data);
        }
        //  else {
        //     // if(this.mainMapData.indexOf(selected.value) > -1){
        //         this.mapDataInfo.splice(this.mainMapData.indexOf(selected.value) ,1)
        //     // }
        // }
        this.handleClick();
    }

    ngOnInit(): void {
        // Get all countries
        // this.toppings = new FormControl();
        let self = this;
        this._utilities.showHeaderMenu.next(false);
        this._utilities.yearSource.subscribe((message: any) => {
            this.year = message;
            this.currentYear = message
            if(localStorage.getItem("selected_country")){
                this.country_ids = localStorage.getItem("selected_country");
              }else{
                if(this.year == 2022){
                    this.country_ids = environment.default_country_2022;
                }else{
                    this.country_ids =  environment.default_country_2021;
                }
            }
        })



        let data = {
            year:this.year
        };
        this._common.getExistedCountries(data).subscribe((result) => {
            this.country_list = result;
        })

        let default_contry = {
            countries:this.country_ids
        }

        this._common.getdefaultCountry(default_contry).subscribe((result) => {
            this.default_contry_list = result;
            let selectedOption:any= [];
            result.forEach(function (element: any, index: any) {
                selectedOption.push(element.country_id)
                self.mySelections.push(element.country_id);
            })
            this.toppings.setValue(selectedOption);
        })

        this.getComparativeData();
    }

    mainMapData: any = [];
    filterCountry: any;
    polygonSeries: any;

    mainMap() {
        this._countries.getCountries().subscribe((result) => {
            this.countries = result;
            this.countries_2021 = this.countries[2021];
            this.countries_2022 = this.countries[2022];
            this.countries = [...this.countries_2021, ...this.countries_2022];
            this.countries = [...this.countries_2022];

            var p: any;
            this.countries = [];
            am5.array.each(am5.registry.rootElements, function (root) {
                if (root && root.dom && root.dom.id == 'chartdiv') {
                    root.dispose();
                }
            });
            this.root = am5.Root.new('chartdiv');

            this.root.setThemes([am5themes_Animated.new(this.root)]);

            this.chart = this.root.container.children.push(
                am5map.MapChart.new(this.root, {
                    panX: 'none',
                    panY: 'none',
                    wheelX: 'none',
                    wheelY: 'none',
                    projection: am5map.geoMercator(),
                })
            );

            // Create polygon series
            this.polygonSeries = this.chart.series.push(
                am5map.MapPolygonSeries.new(this.root, {
                    geoJSON: am5geodata_worldLow,
                    exclude: ['AQ'],
                })
            );

            //polygonSeries styling
            this.polygonSeries.mapPolygons.template.setAll({
                interactive: true,
                fill: am5.color(0xe6e6e6),
                tooltipText: '{name}',
                templateField: 'polygonSettings',
                strokeWidth: 2,
            });

            // push data in polygonSeries to show country colors using iso_codes
            am5.array.each(this.countries, (c: any) => {

                let country_iso_codes = [];

                country_iso_codes.push(c.iso_code);

                this.polygonSeries = this.chart.series.push(
                    am5map.MapPolygonSeries.new(this.root, {
                        geoJSON: am5geodata_worldLow,
                        include: country_iso_codes,
                        name: c.name,
                        fill: am5.color(0x84abbd),
                        flag: '/assets/flags/' + c.flag,
                    })
                );
            });

            this.polygonSeries.mapPolygons.template.states.create('active', {
                fill: this.root.interfaceColors.get('primaryButtonActive'),
            });

            this.pointSeries = this.chart.series.push(
                am5map.MapPointSeries.new(this.root, {})
            );

            // Push Bullets with tooltip
            this.pointSeries.bullets.push(() => {
                this.container = am5.Container.new(this.root, {});

                let tooltip: any = am5.Tooltip.new(this.root, {
                    getFillFromSprite: false,
                    paddingBottom: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingTop: 0,
                    maxWidth: 200,
                    // showTooltipOn: 'always',
                });

                this.circleProperties = {
                    radius: 3,
                    tooltipY: 0,
                    fill: am5.color(0xff0000),
                    strokeWidth: 0,
                    strokeOpacity: 0,
                    tooltip: tooltip,
                    tooltipHTML: `
              <div style="width:130px;text-align:center; background:#fff; padding:10px; box-shadow: 0px 5px 10px rgba(111, 111, 111, 0.2); border-radius:4px; border-radius:1px;">
              <img src="{flag}" width="20px" height="20px" style="border-radius:50%"><br>
              <span style="color:rgba(0, 0, 0, 0.32);font-size:12px;">{title}</span><div style="text-align:center;width:100%;display: flex;justify-content: center;"></div></div>
            `,
                };

                this.circle = am5.Circle.new(this.root, this.circleProperties);

                this.container.children.push(this.circle);

                this.circle.states.create('hover', {
                    radius: 4,
                    scale: 2,
                    strokeWidth: 3,
                    strokeOpacity: 5,
                    stroke: am5.color(0xff7b7b),
                    // showTooltipOn: 'always',
                });

                return am5.Bullet.new(this.root, {
                    sprite: this.container,
                });
            });

            // Push Data in Pointseries
            let addCountry = (
                longitude: number,
                latitude: number,
                title: string,
                flag: string
            ) => {
                this.pointSeries.data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    title: title,
                    flag: '/assets/flags/' + flag,
                });
            };

            for (var i = 0; i < this.countries.length; i++) {
                let country = this.countries[i];
                addCountry(
                    country.lng,
                    country.lat,
                    country.name,
                    country.flag
                );
            }
        });

    }

    getComparativeData(){
        this.comparitive_countries = [];
        this.readiness = [];
        this.availability = [];
        this.capacity_building = [];
        this.development_strategy = [];        
        let selected_years = JSON.parse(localStorage.getItem("selected_years") || '');
        let selectedYear = this.year;
        if(selected_years && selected_years.length == 2){
            selectedYear = selected_years.toString();
        }
        let data = {
            countries: this.country_ids,
            developmentId: '1,2',
            year:selectedYear,
        };
        this._common.getComparative(data).subscribe((result) => {
            result.filter((item: any) => {
                if (!this.comparitive_countries.includes(item.country)) {
                    this.comparitive_countries.push(item.country);
                }

                if (item.development_type == 'Present Development') {
                    if (item.ultimate_field == 'Readiness') {
                        this.readiness.push(item);
                    }

                    if (item.ultimate_field == 'Availability') {
                        this.availability.push(item);
                    }
                } else if (item.development_type == 'Prospective Development') {
                    if (item.ultimate_field == 'Capacity Building') {
                        this.capacity_building.push(item);
                    }

                    if (item.ultimate_field == 'Development Strategy') {
                        this.development_strategy.push(item);
                    }
                }
            });
        });
    }

    ngAfterViewInit(): void {

        this.mainMap();

        var chartDom = this.main.nativeElement;
        var myChart = echarts.init(chartDom);
        var option: any;

        this.networkData.nodes.forEach(function (node: any) {
            node.label = {
                show: node.symbolSize > 30,
            };
        });
        option = {
            title: {
                text: '',
                subtext: '',
                top: 'bottom',
                left: 'right',
            },
            tooltip: {},
            series: [
                {
                    name: '',
                    type: 'graph',
                    layout: 'none',
                    data: this.networkData.nodes,
                    links: this.networkData.links,
                    categories: this.networkData.categories,
                    roam: false,
                    label: {
                        color: '#fff',
                        position: 'inside',
                        align: 'center',
                        formatter: '{b}',
                        verticalAlign: 'middle',
                        fontSize: '10',
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3,
                    },
                },
            ],
        };
        myChart.setOption(option);
        this.handleClick();
    }


    handleClick() {
        //his.mapDataInfo.push({iso_code="CL"})
        this._countries.getCountries().subscribe((result) => {
            this.countries = result;
            this.countries_2021 = this.countries[2021];
            this.countries_2022 = this.countries[2022];
            this.countries = [...this.countries_2021, ...this.countries_2022];
            // this.countries = [...this.countries_2022];
            
            var p: any;
            if (this.mapDataInfo != "") {
                this.countries = this.countries.filter((entry1: any) => this.mapDataInfo.some((entry2: any) => entry1.iso_code == entry2.iso_code));
            } else {
                this.countries = this.default_contry_list;
                this.mapDataInfo = this.default_contry_list;
            }
            this.root.setThemes([am5themes_Animated.new(this.root)]);

            this.chart = this.root.container.children.push(
                am5map.MapChart.new(this.root, {
                    panX: 'none',
                    panY: 'none',
                    wheelX: 'none',
                    wheelY: 'none',
                    projection: am5map.geoMercator(),
                })
            );

            // Create polygon series
            this.polygonSeries = this.chart.series.push(
                am5map.MapPolygonSeries.new(this.root, {
                    geoJSON: am5geodata_worldLow,
                    exclude: ['AQ'],
                })
            );

            //polygonSeries styling
            this.polygonSeries.mapPolygons.template.setAll({
                interactive: true,
                fill: am5.color(0xe6e6e6),
                tooltipText: '{name}',
                templateField: 'polygonSettings',
                strokeWidth: 2,
            });

            // push data in polygonSeries to show country colors using iso_codes
            am5.array.each(this.countries, (c: any) => {

                let country_iso_codes = [];

                country_iso_codes.push(c.iso_code);

                this.polygonSeries = this.chart.series.push(
                    am5map.MapPolygonSeries.new(this.root, {
                        geoJSON: am5geodata_worldLow,
                        include: country_iso_codes,
                        name: c.name,
                        fill: am5.color(0x84abbd),
                        flag: '/assets/flags/' + c.flag,
                    })
                );
            });

            this.polygonSeries.mapPolygons.template.states.create('active', {
                fill: this.root.interfaceColors.get('primaryButtonActive'),
            });

            this.pointSeries = this.chart.series.push(
                am5map.MapPointSeries.new(this.root, {})
            );

            // Push Bullets with tooltip
            this.pointSeries.bullets.push(() => {
                this.container = am5.Container.new(this.root, {});

                let tooltip: any = am5.Tooltip.new(this.root, {
                    getFillFromSprite: false,
                    paddingBottom: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingTop: 0,
                    maxWidth: 200,
                    // showTooltipOn: 'always',
                });



                this.circleProperties = {
                    radius: 3,
                    tooltipY: 0,
                    fill: am5.color(0xff0000),
                    strokeWidth: 0,
                    strokeOpacity: 0,
                    tooltip: tooltip,
                    tooltipHTML: `
                    <div style="width:130px;text-align:center; background:#fff; padding:10px; box-shadow: 0px 5px 10px rgba(111, 111, 111, 0.2); border-radius:4px; border-radius:1px;">
                        <img src="{flag}" width="20px" height="20px" style="border-radius:50%"><br>
                        <span style="color:rgba(0, 0, 0, 0.32);font-size:12px;">{title}</span><div style="text-align:center;width:100%;display: flex;justify-content: center;"></div>
                    </div>
                    `,
                };



                this.circle = am5.Circle.new(this.root, this.circleProperties);

                this.container.children.push(this.circle);

                this.circle.states.create('hover', {
                    radius: 4,
                    scale: 2,
                    strokeWidth: 3,
                    strokeOpacity: 5,
                    stroke: am5.color(0xff7b7b),
                    // showTooltipOn: 'always',
                });



                return am5.Bullet.new(this.root, {
                    sprite: this.container,
                });
            });

            // Push Data in Pointseries
            let addCountry = (
                longitude: number,
                latitude: number,
                title: string,
                flag: string
            ) => {
                this.pointSeries.data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    title: title,
                    flag: '/assets/flags/' + flag,
                });
            };

            for (var i = 0; i < this.countries.length; i++) {
                let country = this.countries[i];
                addCountry(
                    country.lng,
                    country.lat,
                    country.name,
                    country.flag
                );
            }
        });
    }

    doSomething(event:any){
        if (this.toppings.value.length < 3) {
            this.mySelections = this.toppings.value;
            setTimeout(() => {
                if(this.mySelections.length ==  2){
                    this.country_ids = this.mySelections.toString();
                    this.getComparativeData();
                    localStorage.removeItem('selected_country');
                    localStorage.setItem("selected_country", this.country_ids);
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
                        this.country_ids = this.mySelections.toString();
                        this.getComparativeData();
                        localStorage.removeItem('selected_country');
                        localStorage.setItem("selected_country", this.country_ids);
                        this.mySelect.close();
                    }
                }, 1500);
                
            }            
            this.toppings.setValue(this.mySelections);
        }
    }

}

