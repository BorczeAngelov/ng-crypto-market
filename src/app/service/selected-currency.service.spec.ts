import { TestBed } from '@angular/core/testing';

import { SelectedCurrencyService } from './selected-currency.service';

describe('SelectedCurrencyService', () => {
  let service: SelectedCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
