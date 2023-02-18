import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly coinGeckoApi = 'https://api.coingecko.com/api/v3';

  constructor(private httpClient: HttpClient) { }

  getCoinById(coinId: string) {
    return this.httpClient.get<any>(this.coinGeckoApi + `/coins/${coinId}`)
  }

  getCurrency(currency: string) {
    return this.httpClient.get<any>(this.coinGeckoApi + `/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`);
  }

  getTrendingCurrency(currency: string) {
    return this.httpClient.get<any>(this.coinGeckoApi + `/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
  }

  getGrpahicalCurrencyData(
    coinId: string,
    currency: string,
    days: number) {      
    return this.httpClient.get<any>(this.coinGeckoApi + `/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`)
  }
}
