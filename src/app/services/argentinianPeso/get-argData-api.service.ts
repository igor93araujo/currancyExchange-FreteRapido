import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, catchError } from 'rxjs/operators';

@Injectable()
export class GetArsDataAPIService {
  constructor(private http: HttpClient) {}

  private URL_BASE: string = 'https://economia.awesomeapi.com.br/last/';
  public ARS_CONVERTION: string = 'ARS-BRL';

  private ARS_URL: string = `${this.URL_BASE}${this.ARS_CONVERTION}`;

  private cachedArsData$: Observable<any> | null = null; // O cacheArsData$ armazenará os dados em cache pois é um Observable

  getArsData(): Observable<any> {
    if (!this.cachedArsData$) {
      // Se não houver dados em cache, faz a chamada HTTP e armazena em cache por 3 minutos
      this.cachedArsData$ = this.http.get<any>(this.ARS_URL).pipe(
        catchError(() => of(null)), // Trata erros para que o cache não seja quebrado por uma falha de rede
        shareReplay(1, 180000) // Cache por 3 minutos (180000 milissegundos)
      );
    }
    return this.cachedArsData$;
  }
}