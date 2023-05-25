import { Component, OnInit } from '@angular/core';
import { GetCanadDataAPIService } from 'src/app/services/canadianDollar/get-canData-api.service';
import { currancy } from 'src/interfaces/currancy';

@Component({
  selector: 'app-first-currancy',
  templateUrl: './first-currancy.component.html',
  styleUrls: ['../../app.component.sass']
})

export class FirstCurrancyComponent implements OnInit{
  constructor( private GetCanadDataAPIService: GetCanadDataAPIService ) {
    this.getCurrancy()
  }
  
  anyError:boolean = false;
  isLoading:boolean = false;

  canadianDollar:currancy = {
    value: 0,
    variation: 0,
    date: '',
  };
  
  getCurrancy(): void {
    this.isLoading = true;
    this.GetCanadDataAPIService.getCadData().subscribe({
      next: res => { // O next é o que será executado quando a requisição for bem sucedida
        if (res) { // Verifica se os dados não são nulos antes de atribuí-los
          const { CADBRL } = res;
          this.canadianDollar = {
            value: CADBRL.ask,
            variation: CADBRL.varBid,
            date: CADBRL.create_date,
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

// Chamando a api a cada 3 minutos
  ngOnInit(): void {
    setInterval(() => {
      this.getCurrancy()
    }, 180000)
  }
}
