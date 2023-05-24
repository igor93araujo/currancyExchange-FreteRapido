import { Injectable } from '@angular/core'; // o injectable é para que o serviço possa ser injetado em outros componentes
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetDataAPIService {
  constructor( private http: HttpClient ) {}

  private URL_BASE: string = 'https://economia.awesomeapi.com.br/last/';
  public ARS_CONVERTION: string = 'ARS-BRL';

  private ARS_URL: string = `${this.URL_BASE}${this.ARS_CONVERTION}`;

  getArsData() {
    return this.http.get<any>(this.ARS_URL);
  }
}
