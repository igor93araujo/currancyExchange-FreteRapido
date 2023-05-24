import { Injectable } from '@angular/core'; // o injectable é para que o serviço possa ser injetado em outros componentes
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetDataAPIService {
  constructor( private http: HttpClient ) {}

  private URL_BASE: string = 'https://economia.awesomeapi.com.br/last/';
  public GBP_CONVERTION: string = 'GBP-BRL';

  GBP_URL: string = `${this.URL_BASE}${this.GBP_CONVERTION}`;

  getGbpData() {
    return this.http.get<any>(this.GBP_URL);
  }
}
