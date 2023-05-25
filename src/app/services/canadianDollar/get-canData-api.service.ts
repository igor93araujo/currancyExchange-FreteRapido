import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, catchError } from 'rxjs/operators';


@Injectable()
export class GetCanadDataAPIService {
  constructor( private http: HttpClient ) {}

  private URL_BASE: string = 'https://economia.awesomeapi.com.br/last/';
  public CAD_CONVERTION: string = 'CAD-BRL';
  
  private CAD_URL: string = `${this.URL_BASE}${this.CAD_CONVERTION}`;

  private cachedCadData$: Observable<any> | null = null; // O cacheCadData$ armazenará os dados em cache pois é um Observable

  getCadData(): Observable<any> {
    if (!this.cachedCadData$) {
      // Se não houver dados em cache, faz a chamada HTTP e armazena em cache por 3 minutos
      this.cachedCadData$ = this.http.get<any>(this.CAD_URL).pipe(
        catchError(() => of(null)), // Trata erros para que o cache não seja quebrado por uma falha de rede
        shareReplay(1, 180000) // Cache por 3 minutos (180000 milissegundos)
      );
    }
    return this.cachedCadData$;
  }
}
