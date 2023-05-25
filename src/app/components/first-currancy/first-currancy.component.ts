import { Component, OnInit } from '@angular/core';
import { GetDataAPIService } from 'src/app/services/canadianDollar/get-canData-api.service';
import { currancy } from 'src/interfaces/currancy';

@Component({
  selector: 'app-first-currancy',
  templateUrl: './first-currancy.component.html',
  styleUrls: ['../../app.component.sass']
})

export class FirstCurrancyComponent implements OnInit{
  
  constructor( private getDataApiService: GetDataAPIService ) {
    this.getCurrancy()
  }
  
  anyError:boolean = false;
  isLoading:boolean = false;
  canadianDollar:currancy = {
    value: 0,
    variation: 0,
    date: '',
  };
  
  getCurrancy = ():void => {
    this.getDataApiService.getCadData().subscribe(
      res => {
        const {CADBRL} = res;
        this.canadianDollar = {
          value: CADBRL.ask,
          variation: CADBRL.varBid,
          date: CADBRL.create_date,
        }
      }
    )
    this.isLoading = false
  }

// Chamando a api a cada 3 minutos
  ngOnInit(): void {
    setInterval(() => {
      this.getCurrancy()
    }, 180000)
  }
}
