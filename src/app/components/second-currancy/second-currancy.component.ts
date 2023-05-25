import { Component, OnInit } from '@angular/core';
import { GetArsDataAPIService } from 'src/app/services/argentinianPeso/get-argData-api.service';
import { currancy } from 'src/interfaces/currancy';

@Component({
  selector: 'app-second-currancy',
  templateUrl: './second-currancy.component.html',
  styleUrls: ['../../app.component.sass']
})
export class SecondCurrancyComponent implements OnInit{
  constructor( private GetArsDataAPIService: GetArsDataAPIService ) {
    this.getCurrancy()
  }
  
  anyError:boolean = false;
  isLoading:boolean = false;

  argentPeso:currancy = {
    value: 0,
    variation: 0,
    date: '',
  };
  
  getCurrancy(): void {
    this.isLoading = true;
    this.GetArsDataAPIService.getArsData().subscribe({
      next: res => { // O next é o que será executado quando a requisição for bem sucedida
        if (res) { // Verifica se os dados não são nulos antes de atribuí-los
          const { ARSBRL } = res;
          this.argentPeso = {
            value: ARSBRL.ask,
            variation: ARSBRL.varBid,
            date: ARSBRL.create_date,
          };
        }
        this.isLoading = false;
      },
      error: error => {
        console.log('Erro ao obter os dados da API:', error);
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    setInterval(() => {
      this.getCurrancy()
    }, 180000)
  }
}
