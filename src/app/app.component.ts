import { Component } from '@angular/core';
import { SelectedCurrencyService } from './service/selected-currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedCurrency: string = "EUR";

  constructor(private selectedCurrencyService: SelectedCurrencyService) {

  }

  selectCurrency(event: string) {
    console.log(event);
    this.selectedCurrencyService.setSelectedCurrency(event);
  }
}
