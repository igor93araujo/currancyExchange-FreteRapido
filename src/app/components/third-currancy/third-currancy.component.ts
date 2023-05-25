import { Component } from '@angular/core';
import { GetDataAPIService } from 'src/app/services/pounds/get-data-api.service';
import { currancy } from 'src/interfaces/currancy';

@Component({
  selector: 'app-third-currancy',
  templateUrl: './third-currancy.component.html',
  styleUrls: ['../../app.component.sass']
})
export class ThirdCurrancyComponent {
  constructor( private getDataApiService: GetDataAPIService ) {
    this.getCurrancy()
  }
  
  anyError:boolean = false;
  isLoading:boolean = false;

  pounds:currancy = {
    value: 0,
    variation: 0,
    date: '',
  };
  
  getCurrancy = ():void => {
    this.getDataApiService.getGbpData().subscribe(
      res => {
        const {GBPBRL} = res;
        this.pounds = {
          value: GBPBRL.ask,
          variation: GBPBRL.varBid,
          date: GBPBRL.create_date,
        }
      },
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
