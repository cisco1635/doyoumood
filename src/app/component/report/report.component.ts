import { Component, OnInit, ElementRef } from '@angular/core';
import { ReportService } from '../../service/report.service';
import { Chart } from 'chart.js';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  // Todo : on init error Failed to create chart: can't acquire context from the given item
  donutChart=new Chart('donutCanvas',{});
  lineChart=new Chart('lineCanvas', {});
  moyenne = "";
  nbVote = "";
  showImg = false;

  constructor(private svc : ReportService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.showImg = false;
  }

  getData(date1, date2) {
    this.svc.getData(date1, date2)
    .subscribe(res => {
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
