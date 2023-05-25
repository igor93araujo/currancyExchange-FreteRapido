import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, catchError } from 'rxjs/operators';

@Injectable()
export class GetPouDataAPIService {
  constructor( private http: HttpClient ) {}

  private URL_BASE: string = 'https://economia.awesomeapi.com.br/last/';
  public GBP_CONVERTION: string = 'GBP-BRL';

  private GBP_URL: string = `${this.URL_BASE}${this.GBP_CONVERTION}`;

  private cachedGbpData$: Observable<any> | null = null; // O cacheGbpData$ armazenará os dados em cache pois é um Observable

  getGbpData(): Observable<any> {
    if (!this.cachedGbpData$) {
      // Se não houver dados em cache, faz a chamada HTTP e armazena em cache por 3 minutos
      this.cachedGbpData$ = this.http.get<any>(this.GBP_URL).pipe(
        catchError(() => of(null)), // Trata erros para que o cache não seja quebrado por uma falha de rede
        shareReplay(1, 180000) // Cache por 3 minutos (180000 milissegundos)
      );
    }
    return this.cachedGbpData$;
  }
}
