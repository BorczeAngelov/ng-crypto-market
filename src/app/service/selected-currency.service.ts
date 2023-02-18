import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedCurrencyService {

  private selectedCurrency$ = new BehaviorSubject<string>("EUR");
  constructor() { }

  getSelectedCurrency() {
    return this.selectedCurrency$.asObservable();
  }

  setSelectedCurrency(currency: string) {
    this.selectedCurrency$.next(currency);
  }
}
