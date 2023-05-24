import { Component, OnInit } from '@angular/core';
import { GetDataAPIService } from 'src/app/services/get-data-api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})


export class MainPageComponent implements OnInit {
  exchanges: any[] = []
  anyError = false;
  isLoading = true;

  constructor( private getDataApiService: GetDataAPIService ) {
    this.createData()
  }

  createData = ():void => {
    this.isLoading = true
    this.getDataApiService.getData().subscribe(
      res => {
        const {CADBRL, GBPBRL, ARSBRL} = res;

        const canadianDollar = {
          name: 'Dólar Canadense',
          value: CADBRL.ask,
          variation: CADBRL.varBid,
          date: CADBRL.create_date,
        }
        const argentinianPeso = {
          name: 'Peso Argentino',
          value: ARSBRL.ask,
          variation: ARSBRL.varBid,
          date: ARSBRL.create_date,
        }
        const pound = {
          name: 'Libra Esterlina',
          value: GBPBRL.ask,
          variation: GBPBRL.varBid,
          date: GBPBRL.create_date,
        }

        this.exchanges.push(
            canadianDollar,
            argentinianPeso,
            pound,
          )
      },
      err => {
        this.anyError = true
      }
    )
    this.isLoading = false
  }

  ngOnInit(): void {
    setInterval(() => {
      this.exchanges = []
      this.createData()
    }
    , 180000) // 3 minutes
  }
}
