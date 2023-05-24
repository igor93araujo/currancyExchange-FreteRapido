import { Component, OnInit } from '@angular/core';
import { GetDataAPIService } from 'src/app/services/argentinianPeso/get-argData-api.service';

@Component({
  selector: 'app-second-currancy',
  templateUrl: './second-currancy.component.html',
})
export class SecondCurrancyComponent implements OnInit{
  constructor( private getDataApiService: GetDataAPIService ) {
    this.getCurrancy()
  }
  
  anyError = false;
  isLoading = true;
  argentPeso = {
    value: 0,
    variation: 0,
    date: '',
  };
  
  getCurrancy = () => {
    this.getDataApiService.getArsData().subscribe(
      res => {
        const {ARSBRL} = res;
        this.argentPeso = {
          value: ARSBRL.ask,
          variation: ARSBRL.varBid,
          date: ARSBRL.create_date,
        }
      },
      err => {
        this.anyError = true
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
