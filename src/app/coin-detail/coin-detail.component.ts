import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'


@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css']
})
export class CoinDetailComponent implements OnInit {

  coinData: any;
  coinId!: string;
  days: number = 30;
  currency: string = "USD";

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };

  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => {
      this.coinId = value['id'];
    })

    this.getCoinData();
    this.getGraphData();
  }


  getCoinData() {
    this.api.getCoinById(this.coinId)
      .subscribe(response => {
        this.coinData = response;
        console.log(this.coinData);
      })
  }

  getGraphData() {
    this.api.getGrpahicalCurrencyData(this.coinId, "USD", this.days)
      .subscribe(response => {
        console.log(response);

        setTimeout(() => {
          this.myLineChart.chart?.update()
        }, 200)

        this.lineChartData.datasets[0].data = response.prices
          .map((a: any) => {
            return a[1]; //return second element
          });

        this.lineChartData.labels = response.prices
          .map((a: any) => {
            let date = new Date(a[0]); //take first element

            // let time = date.getHours() > 12 ?
            //   `${date.getHours() - 12}: ${date.getMinutes()} PM` :
            //   `${date.getHours()}: ${date.getMinutes()} AM`;

            let time = `${date.getHours()}: ${date.getMinutes()}`;

            return this.days === 1 ? time : date.toLocaleDateString();
          });


      });
  }
}
