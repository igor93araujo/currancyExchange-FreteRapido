import { Injectable } from '@angular/core'; // o injectable é para que o serviço possa ser injetado em outros componentes
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetDataAPIService {
  private URL_BASE: string = 'https://economia.awesomeapi.com.br/last/';
  public CAD_CONVERTION: string = 'CAD-BRL';
  public ARS_CONVERTION: string = 'ARS-BRL';
  public GBP_CONVERTION: string = 'GBP-BRL';

  FULL_URL: string = `${this.URL_BASE}${this.CAD_CONVERTION},${this.ARS_CONVERTION},${this.GBP_CONVERTION}`;

  constructor( private http: HttpClient ) {}

  getData() {
    return this.http.get<any>(this.FULL_URL);
  }
}
