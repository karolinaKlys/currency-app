import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Nbp_model} from "../nbp_model";


@Injectable({
  providedIn: 'root'
})
export class NbpExchangeService {

  private readonly apiURL: string = 'http://api.nbp.pl/api/exchangerates/tables/a';

  constructor(private http: HttpClient) {
  }

  public getCurrencyRates(): Observable<Nbp_model> {
    return this.http.get<any>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
