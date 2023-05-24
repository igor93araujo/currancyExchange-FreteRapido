import { Component } from '@angular/core';
import { GetDataAPIService } from 'src/app/services/pounds/get-data-api.service';

@Component({
  selector: 'app-third-currancy',
  templateUrl: './third-currancy.component.html',
})
export class ThirdCurrancyComponent {
  constructor( private getDataApiService: GetDataAPIService ) {
    this.getCurrancy()
  }
  
  anyError = false;
  isLoading = true;
  pounds = {
    value: 0,
    variation: 0,
    date: '',
  };
  
  getCurrancy = () => {
    this.getDataApiService.getGbpData().subscribe(
      res => {
        const {GBPBRL} = res;
        this.pounds = {
          value: GBPBRL.ask,
          variation: GBPBRL.varBid,
          date: GBPBRL.create_date,
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
