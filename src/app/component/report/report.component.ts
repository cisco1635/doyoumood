import { Component, OnInit, ElementRef } from '@angular/core';
import { ReportService } from '../../service/report.service';
import { Chart } from 'chart.js';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Report } from '../../models/report';

import { Moment } from 'moment';

import * as moment from 'moment';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ReportComponent implements OnInit {

  donutChart=null;
  lineChart=null;
  imgmoyenne ="";
  nbVote = "";
  showImg = false;
  public fromDate : Moment;
  public toDate : Moment;
  comments={};

  constructor(private svc : ReportService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.showImg = false;
    // Init the datepickers with last week
    this.fromDate = moment().days(-7);
    this.toDate = moment();
    this.donutChart = new Chart('donutCanvas', {});
    this.lineChart = new Chart('lineCanvas', {});
  }

  getData() {
    const date1 = this.fromDate.year()+ getMonth(this.fromDate)+getDay(this.fromDate);
    const date2 = this.toDate.year()+getMonth(this.toDate)+getDay(this.toDate);
    this.svc.getData(date1, date2).subscribe((data:Report)=>{

        this.nbVote = data.nbVote.toString();
        this.imgmoyenne = "assets/images/"+data.imgmoyenne+".png";

        // create donutChart
        this.donutChart = new Chart('donutCanvas', {
          type: 'pie',
          data: {
            labels: ["Overjoyed", "Happy", "Neutral", "Annoyed", "Angry"],
            datasets: [{
              data : [
                data.repart.overjoyed,
                data.repart.happy,
                data.repart.neutral,
                data.repart.annoyed,
                data.repart.angry
              ],
              backgroundColor: [
                'rgb(0, 157, 224)',
                'rgb(151, 191, 14)',
                'rgb(242, 148, 0)',
                'rgb(127, 0, 55)',
                'rgb(255, 241, 96)'
              ],
              borderWidth: 0
            }]
          },
          options: {
            animation: { animateRotate: true },
            legend: { display: false },
            circumference: Math.PI,
            rotation: Math.PI
          }
        })

        // create lineChart
        const mylabels =[];
        const mydatas = [];
        enum months { "janv", "fev", "mars", "avril", "mai","juin","juill","août","sept","oct","nov","dec"};

        for(var i in data.trend){
          let d = new Date(i);
          let dateFormat = d.getDate() +  " " + months[d.getMonth()] + " " + d.getFullYear();
          mylabels.push(dateFormat);
          mydatas.push(data.trend[i]);
        }

        this.lineChart = new Chart('lineCanvas', {
          type: 'line',
          data: {
            labels: mylabels,
            datasets: [{
              data: mydatas,
              pointBorderColor: "#000",
              borderColor: "#000",
              borderWidth: 3
            }]
          },
          options: {
            legend: { display: false },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                      display:false,
                        suggestedMin: 0,
                        suggestedMax: 5,
                        stepSize: 1,
                        fontColor: "#FFF"
                    },
                    gridLines: {
                        color: "#FFF"
                    }
                }],
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        color: "#FFF"
                    },
                    ticks: {
                        fontColor: "#000"
                    },
                }]
            }
          }
        }) 
        
        this.comments = data.comments;
      }
    );
    
    this.showImg = true;
  }
}

function getMonth(moment) {
  var month = moment.month() + 1;
  return month < 10 ? '0' + month : '' + month;
}  

function getDay(moment) {
  var day = moment.date();
  return day < 10 ? '0' + day : '' + day;
}  