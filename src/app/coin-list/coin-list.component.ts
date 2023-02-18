import { ApiService } from '../service/api.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectedCurrencyService } from '../service/selected-currency.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {

  bannerData: any = [];
  currency: string = "EUR"
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['market_cap_rank', 'symbol', 'current_price', 'price_change_percentage_24h', 'market_cap']; //columns come from API value

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private router: Router, private selectedCurrencyService: SelectedCurrencyService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();

    this.selectedCurrencyService.getSelectedCurrency()
      .subscribe(value => {
        this.currency = value;
        this.getAllData();
        this.getBannerData();
      });
  }

  getBannerData() {

    this.api.getTrendingCurrency(this.currency)
      .subscribe(response => {
        console.log(response);
        this.bannerData = response;
      });
  }

  getAllData() {
    this.api.getCurrency(this.currency)
      .subscribe(response => {
        console.log(response);

        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoDetails(row: any) {
    this.router.navigate(['coin-detail', row.id])
  }
}
