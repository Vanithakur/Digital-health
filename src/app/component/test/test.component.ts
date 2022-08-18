import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { EChartsOption } from 'echarts';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit, AfterViewInit {
    chartOptionRadar: EChartsOption = {
        color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
        title: {
            text: 'Radar Chart',
        },
        legend: {},
        radar: [
            {
                indicator: [
                    { text: 'Availability' },
                    { text: 'Capacity Building' },
                    { text: 'Development Strategy' },
                    { text: 'Readiness' },
                ],
                center: ['25%', '50%'],
                radius: 120,
                startAngle: 90,
                splitNumber: 4,
                shape: 'circle',
                axisName: {
                    formatter: '【{value}】',
                    color: '#428BD4',
                },
                splitArea: {
                    areaStyle: {
                        color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                        shadowBlur: 10,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(211, 253, 250, 0.8)',
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(211, 253, 250, 0.8)',
                    },
                },
            },
        ],
        series: [
            {
                type: 'radar',
                emphasis: {
                    lineStyle: {
                        width: 4,
                    },
                },
                data: [
                    {
                        value: [100, 8, 0.4, -80, 2000],
                        name: 'Data A',
                    },
                    {
                        value: [60, 5, 0.3, -100, 1500],
                        name: 'Data B',
                        areaStyle: {
                            color: 'rgba(255, 228, 52, 0.6)',
                        },
                    },
                ],
            },
        ],
    };

    chartOptionBar: EChartsOption = {
        title: {
            text: 'Health Governance',
        },
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ['Readiness', 'Availability'],
                ['Japan', 60, 70],
                ['Australia', 80, 80],
                ['India', 50, 70],
                ['China', 60, 50],
                ['Spain', 60, 50],
            ],
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }],
    };

    // graph = {
    //   nodes: [
    //     {
    //       id: '1',
    //       name: 'Health IT',
    //       symbolSize: 66,
    //       x: -87.93029,
    //       y: -6.8120565,
    //       value: 100,
    //       category: 1,
    //     },
    //     {
    //       id: '2',
    //       name: 'Present Developent',
    //       symbolSize: 40,
    //       x: -100.84915,
    //       y: 58.7059,
    //       value: 17.714287,
    //       category: 3,
    //     },
    //     {
    //       id: '3',
    //       name: 'Prospective Developent',
    //       symbolSize: 40,
    //       x: -100.84915,
    //       y: 28.7059,
    //       value: 17.714287,
    //       category: 3,
    //     },
    //     {
    //       id: '4',
    //       name: 'Availability',
    //       symbolSize: 11,
    //       x: -250.84915,
    //       y: 90.7059,
    //       value: 17.714287,
    //       category: 0,
    //     },
    //     {
    //       id: '5',
    //       name: 'Readiness',
    //       symbolSize: 11,
    //       x: -250.84915,
    //       y: 120.7059,
    //       value: 17.714287,
    //       category: 0,
    //     },
    //     {
    //       id: '6',
    //       name: 'Capacity Building',
    //       symbolSize: 11,
    //       x: -250.84915,
    //       y: 40.7059,
    //       value: 17.714287,
    //       category: 0,
    //     },
    //     {
    //       id: '7',
    //       name: 'Develpment startegy',
    //       symbolSize: 11.809524666666666,
    //       x: -250.84915,
    //       y: 10.7059,
    //       value: 17.714287,
    //       category: 0,
    //     },
    //     // {
    //     //     "id": "3",
    //     //     "name": "Judge",
    //     //     "symbolSize": 11.809524666666666,
    //     //     "x": -600,
    //     //     "y": 100,
    //     //     "value": 17.714287,
    //     //     "category": 3
    //     // },
    //     // {
    //     //     "id": "4",
    //     //     "name": "Judge",
    //     //     "symbolSize": 11.809524666666666,
    //     //     "x": -600,
    //     //     "y": 200,
    //     //     "value": 10.714287,
    //     //     "category": 3
    //     // },
    //     // {
    //     //     "id": "5",
    //     //     "name": "Judge",
    //     //     "symbolSize": 11.809524666666666,
    //     //     "x": -600,
    //     //     "y": 300,
    //     //     "value": 17.714287,
    //     //     "category": 3
    //     // },
    //     // {
    //     //     "id": "6",
    //     //     "name": "Judge",
    //     //     "symbolSize": 11.809524666666666,
    //     //     "x": -600,
    //     //     "y": 400,
    //     //     "value": 10.714287,
    //     //     "category": 3
    //     // },
    //   ],
    //   links: [
    //     {
    //       source: '1',
    //       target: '2',
    //     },
    //     {
    //       source: '1',
    //       target: '3',
    //     },
    //     {
    //       source: '2',
    //       target: '4',
    //     },
    //     {
    //       source: '2',
    //       target: '5',
    //     },
    //     {
    //       source: '3',
    //       target: '6',
    //     },
    //     {
    //       source: '3',
    //       target: '7',
    //     },
    //     // {
    //     //     "source": "2",
    //     //     "target": "4"
    //     // },
    //     // {
    //     //     "source": "2",
    //     //     "target": "5"
    //     // },
    //     // {
    //     //     "source": "2",
    //     //     "target": "6"
    //     // },
    //   ],
    //   categories: [
    //     {
    //       name: 'A',
    //     },
    //     {
    //       name: 'B',
    //     },
    //     {
    //       name: 'C',
    //     },
    //     {
    //       name: 'D',
    //     },
    //   ],
    // };

    // chartOptionNode: EChartsOption = {
    //   title: {
    //     text: 'Les Miserables',
    //     subtext: 'Default layout',
    //     top: 'bottom',
    //     left: 'right',
    //   },
    //   tooltip: {},
    //   legend: [
    //     {
    //       // selectedMode: 'single',
    //       data: this.graph.categories.map(function (a) {
    //         return a.name;
    //       }),
    //     },
    //   ],
    //   animationDuration: 1500,
    //   animationEasingUpdate: 'quinticInOut',
    //   series: [
    //     {
    //       name: 'Les Miserables',
    //       type: 'graph',
    //       layout: 'none',
    //       data: this.graph.nodes,
    //       links: this.graph.links,
    //       categories: this.graph.categories,
    //       roam: true,
    //       label: {
    //         position: 'right',
    //         formatter: '{b}',
    //       },
    //       lineStyle: {
    //         color: 'source',
    //         curveness: 0.3,
    //       },
    //       emphasis: {
    //         focus: 'adjacency',
    //         lineStyle: {
    //           width: 10,
    //         },
    //       },
    //     },
    //   ],
    // };

    constructor() {}

    ngOnInit(): void {
        // Create root and chart
        let root = am5.Root.new('chartdiv');

        root.setThemes([am5themes_Animated.new(root)]);

        let chart: any = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: 'none',
                panY: 'none',
                wheelX: 'none',
                wheelY: 'none',
                projection: am5map.geoMercator(),
            })
        );

        // Create polygon series
        let polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldLow,
                exclude: ['AQ'],
            })
        );

        // let tooltip:any = am5.Tooltip.new(root, {
        //   getFillFromSprite: false,
        //   labelText: "[bold]{name}"
        // });

        // tooltip.get("background").setAll({
        //   fill: am5.color(0x00ffff),
        //   fillOpacity: 0.8
        // });

        //polygonSeries.set("tooltip", tooltip);

        polygonSeries.set('fill', am5.color(0xffffff));
        polygonSeries.set('stroke', am5.color(0x000000));

        polygonSeries.mapPolygons.template.setAll({
            // tooltipText: '{name}',
            // toggleKey: 'active',

            templateField: 'polygonSettings',
            interactive: true,
        });

        // polygonSeries.mapPolygons.template.states.create('hover', {
        //   fill: am5.color(0x677935),
        // });

        polygonSeries.mapPolygons.template.states.create('active', {
            fill: root.interfaceColors.get('primaryButtonActive'),
        });

        // let cities: any = {
        //   type: 'FeatureCollection',
        //   features: [
        //     {
        //       type: 'Feature',
        //       properties: {
        //         name: 'India',
        //       },
        //       geometry: {
        //         type: 'Point',
        //         coordinates: [78.96288, 20.593684],
        //       },
        //     },
        //     {
        //       type: 'Feature',
        //       properties: {
        //         name: 'London',
        //       },
        //       geometry: {
        //         type: 'Point',
        //         coordinates: [-0.454296, 51.47002],
        //       },
        //     },
        //     {
        //       type: 'Feature',
        //       properties: {
        //         name: 'Beijing',
        //       },
        //       geometry: {
        //         type: 'Point',
        //         coordinates: [116.597504, 40.072498],
        //       },
        //     },
        //   ],
        // };

        //Create point series
        // let pointSeries = chart.series.push(
        //   am5map.MapPointSeries.new(root, {
        //     geoJSON: cities,
        //     exclude: ['AQ'],
        //   })
        // );

        // pointSeries.bullets.push(function () {
        //   let circle = am5.Circle.new(root, {
        //     radius: 3,
        //     fill: am5.color(0xff0000),
        //     tooltipText: '{name}',
        //   });

        //   circle.events.on('click', function (ev) {
        //     console.log(ev.target.dataItem);
        //   });

        //   circle.states.create('hover', {
        //     radius: 15,
        //     stroke: am5.color(0xff9f9f),
        //     fill: am5.color(0xff9f9f),
        //   });

        //   return am5.Bullet.new(root, {
        //     sprite: circle,
        //   });
        // });

        // let pieChart = am4core.create('pieChartdiv', am4charts.PieChart3D);
        // pieChart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        // pieChart.data = [
        //   {
        //     country: 'Availablity',
        //     litres: 50,
        //   },
        //   {
        //     country: 'Readiness',
        //     litres: 80,
        //   },
        //   {
        //     country: 'Readiness',
        //     litres: 20,
        //   },
        // ];

        // pieChart.innerRadius = am4core.percent(50);

        // // chart.legend = new am4charts.Legend();
        // // chart.legend.position = "right";

        // let pieSeries = pieChart.series.push(new am4charts.PieChart3D());

        // let label = pieSeries.createChild(am4core.Label);
        // label.text = '65%';
        // label.horizontalCenter = 'middle';
        // label.verticalCenter = 'middle';
        // label.fontSize = 40;

        // let series = chart.series.push(new am4charts.PieSeries3D());
        // series.dataFields.value = 'litres';
        // // series.dataFields.depthValue = "litres";
        // series.dataFields.category = 'country';
        // series.slices.template.cornerRadius = 8;
        // series.colors.step = 2;

        let pointSeries = chart.series.push(
            am5map.MapPointSeries.new(root, {})
        );
        //let colorset = am5.ColorSet.new(root, {});

        pointSeries.bullets.push(function () {
            let container = am5.Container.new(root, {
                background: am5.Rectangle.new(root, {
                    fill: am5.color(0xff5599),
                    fillOpacity: 0.2,
                }),
            });

            // let tooltip:any = am5.Tooltip.new(root, {});
            // tooltip.get("background").setAll({
            //   fill: am5.color(0xeeeeee)
            // });
            // container.set("tooltip", tooltip);

            container.children.push(
                am5.Circle.new(root, {
                    radius: 3,
                    //tooltip: 0,
                    // fill: colorset.next(),
                    fill: am5.color(0xff0000),
                    strokeOpacity: 0,
                    tooltipHTML: `
        {title}<br>
        <img src="{flag}" width="30px">`,
                })
            );

            return am5.Bullet.new(root, {
                sprite: container,
            });
        });

        let countries = [
            {
                title: 'France',
                latitude: 48.8567,
                longitude: 2.351,
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Flag_of_Paris_with_coat_of_arms.svg/1280px-Flag_of_Paris_with_coat_of_arms.svg.png',
            },
            {
                title: 'Russia',
                latitude: 55.7558,
                longitude: 37.6176,
                flag: 'https://ak.picdn.net/shutterstock/videos/1053933155/thumb/1.jpg',
            },
            {
                title: 'Spain',
                latitude: 40.4167,
                longitude: -3.7033,
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_the_Community_of_Madrid.svg/800px-Flag_of_the_Community_of_Madrid.svg.png',
            },
            {
                title: 'United Kingdom',
                latitude: 51.5002,
                longitude: -0.1262,
                url: 'http://www.google.co.uk',
                flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png',
            },
            {
                title: 'India',
                latitude: 28.6353,
                longitude: 77.225,
                flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png',
            },
            {
                title: 'Japan',
                latitude: 35.6785,
                longitude: 139.6823,
                flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png',
                url: 'http://www.google.co.jp',
            },
        ];

        for (var i = 0; i < countries.length; i++) {
            let country = countries[i];
            addCountry(
                country.longitude,
                country.latitude,
                country.title,
                country.flag
            );
        }

        function addCountry(
            longitude: number,
            latitude: number,
            title: string,
            flag: string
        ) {
            pointSeries.data.push({
                geometry: { type: 'Point', coordinates: [longitude, latitude] },
                title: title,
                flag: flag,
            });
        }
    }

    ngAfterViewInit() {
        am4core.useTheme(am4themes_animated);
        // Themes end

        let chart = am4core.create('chartdiv', am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.legend = new am4charts.Legend();

        chart.data = [
            {
                country: 'Readiness',
                litres: 501.9,
            },
            {
                country: 'Avaliability',
                litres: 301.9,
            },
            {
                litres: 201.1,
            },
        ];

        chart.innerRadius = 100;

        let series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = 'litres';
        series.dataFields.category = 'country';

        series.colors.list = ['#008797', '#4DFFAE', '#DCDCDC'].map(function (
            color
        ) {
            return new (am4core.color as any)(color);
        });

        var label = series.createChild(am4core.Label);
        label.text = '65%';
        label.horizontalCenter = 'middle';
        label.verticalCenter = 'middle';
        label.fontSize = 40;

        // series.dataFields.value = "value";
        // series.dataFields.category = "category";
        // series.alignLabels = false;

        series.ticks.template.events.on('ready', hideSmall);
        series.ticks.template.events.on('visibilitychanged', hideSmall);
        series.labels.template.events.on('ready', hideSmall);
        series.labels.template.events.on('visibilitychanged', hideSmall);

        function hideSmall(ev: any) {
            if (ev.target.dataItem.values.value.percent < 21) {
                ev.target.hide();
            } else {
                ev.target.show();
            }
        }

        series.labels.template.text = '{country}';
        console.log(chart.data[2]);

        series.slices.template.tooltipText = '{category}';
        console.log(series);
    }
}
