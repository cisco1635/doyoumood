import { Component, OnInit, ElementRef } from '@angular/core';
import { ReportService } from '../../service/report.service';
import { Chart } from 'chart.js';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

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

  // Todo : on init error Failed to create chart: can't acquire context from the given item
  donutChart=new Chart('donutCanvas',{});
  lineChart=new Chart('lineCanvas', {});
  moyenne = "";
  nbVote = "";
  showImg = false;
  public fromDate : Moment;
  public toDate : Moment;

  constructor(private svc : ReportService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.showImg = false;
  }

  getData() {
    const date1 = this.fromDate.year()+getMonth(this.fromDate)+getDay(this.fromDate);
    const date2 = this.toDate.year()+getMonth(this.toDate)+getDay(this.toDate);
    this.svc.getData(date1, date2)
    .subscribe(res => {
      // todo : create an object with values
      // todo : put suscribe in report.service.ts
      this.nbVote = res["nbVote"];
      this.moyenne = "assets/images/"+res["moyenne"]+".png";

      // create donutChart
      this.donutChart = new Chart('donutCanvas', {
        type: 'pie',
        data: {
          labels: ["Overjoyed", "Happy", "Neutral", "Annoyed", "Angry"],
          datasets: [{
            data : [
              res["repart"].overjoyed,
              res["repart"].happy,
              res["repart"].neutral,
              res["repart"].annoyed,
              res["repart"].angry],
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
      var mylabels=[];
      var mydatas =[];
      for(var i in res["trend"] ) {
        mylabels.push(i);
        mydatas.push(res["trend"][i]);
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
                      fontColor: "#FFF"
                  },
              }]
          }
        }
      })
    });
    
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