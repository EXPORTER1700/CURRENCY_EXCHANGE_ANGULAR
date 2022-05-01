import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Currency {
  r030: number
  txt: string
  rate: number
  cc: string
  exchangedate: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currencies: Currency[] = []
  headerCurrencies: Currency[] = []

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get<Currency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe(response => {
        this.currencies = response
        this.headerCurrencies = response.filter(currency => currency.cc === 'USD' || currency.cc === 'EUR')
      })
  }
}
