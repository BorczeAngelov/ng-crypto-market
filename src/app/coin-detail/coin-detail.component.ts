import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css']
})
export class CoinDetailComponent implements OnInit {

  coinData: any;
  coinId!: string;
  days: number = 1;
  currency: string = "USD";

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => {
      this.coinId = value['id'];
    })

    this.getCoinData();
  }


  getCoinData() {
    this.api.getCoinById(this.coinId)
      .subscribe(response => {
        this.coinData = response;
        console.log(this.coinData);
      })
  }
}
