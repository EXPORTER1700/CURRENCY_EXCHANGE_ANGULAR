import {Component, Input, OnInit} from '@angular/core';
import {Currency} from "../app.component";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  @Input() currencies: Currency[] = []
  fromCurrency = {
    name: 'USD',
    count: 0
  }
  toCurrency = {
    name: 'EUR',
    count: 0
  }

  ngOnInit(): void {
  }

  converter = (from: string, to: string, count: number): number => {
    const [fromCurrency] = this.currencies.filter(currency => currency.cc === from)
    const [toCurrency] = this.currencies.filter(currency => currency.cc === to)
    return +((fromCurrency.rate * count) / toCurrency.rate).toFixed(2)
  }
  onChangeFromSelect = (event: any) => {
    const name = event.target.value
    this.fromCurrency.name = name
    this.toCurrency.count = this.converter(name, this.toCurrency.name, this.fromCurrency.count)
  }
  onChangeToSelect = (event: any) => {
    const name = event.target.value
    this.toCurrency = {
      name,
      count: this.converter(this.fromCurrency.name, name, this.fromCurrency.count)
    }
  }
  onChangeFromInput = (event: any) => {
    const count = event.target.value
    if (count == Number(count)) {
      this.fromCurrency.count = Number(count)
      this.toCurrency.count = this.converter(this.fromCurrency.name, this.toCurrency.name, count)
    }
  }
  onChangeToInput = (event: any) => {
    const count = event.target.value
    if (count == Number(count)) {
      this.toCurrency.count = Number(count)
      this.fromCurrency.count = this.converter(this.toCurrency.name, this.fromCurrency.name, count)
    }
  }
  revers = () => {
    const obj = {...this.fromCurrency}
    this.fromCurrency = {...this.toCurrency}
    this.toCurrency = {...obj}
  }
}
