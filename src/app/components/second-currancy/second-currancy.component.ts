import { Component, OnInit } from '@angular/core';
  import { delay } from 'rxjs';
import { GetDataAPIService } from 'src/app/services/argentinianPeso/get-argData-api.service';
import { currancy } from 'src/interfaces/currancy';

@Component({
  selector: 'app-second-currancy',
  templateUrl: './second-currancy.component.html',
  styleUrls: ['../../app.component.sass']
})
export class SecondCurrancyComponent implements OnInit{
  constructor( private getDataApiService: GetDataAPIService ) {
    this.getCurrancy()
  }
  
  anyError:boolean = false;
  isLoading:boolean = false;

  argentPeso:currancy = {
    value: 0,
    variation: 0,
    date: '',
  };
  
  getCurrancy = ():void => {
    this.isLoading = true
    this.getDataApiService.getArsData().subscribe(
      res => {
        const {ARSBRL} = res;
        this.argentPeso = {
          value: ARSBRL.ask,
          variation: ARSBRL.varBid,
          date: ARSBRL.create_date,
        };
      }
    )
    this.isLoading = false
  }

  ngOnInit(): void {
    setInterval(() => {
      this.getCurrancy()
    }, 180000)
  }
}
