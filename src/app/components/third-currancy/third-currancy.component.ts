import { Component } from '@angular/core';
import { GetPouDataAPIService } from 'src/app/services/pounds/get-data-api.service';
import { currancy } from 'src/interfaces/currancy';

@Component({
  selector: 'app-third-currancy',
  templateUrl: './third-currancy.component.html',
  styleUrls: ['../../app.component.sass']
})
export class ThirdCurrancyComponent {
  constructor( private GetPouDataAPIService: GetPouDataAPIService ) {
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
    this.isLoading = true;
    this.GetPouDataAPIService.getGbpData().subscribe({
      next: res => { // O next é o que será executado quando a requisição for bem sucedida
        if (res) { // Verifica se os dados não são nulos antes de atribuí-los
          const { GBPBRL } = res;
          this.pounds = {
            value: GBPBRL.ask,
            variation: GBPBRL.varBid,
            date: GBPBRL.create_date,
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
