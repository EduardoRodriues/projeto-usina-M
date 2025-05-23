import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FrequenciasPage } from '../containers/frequencia/models/frequencia-page';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrequenciaService {

  private readonly API = 'api/frequencias';

  constructor(private http: HttpClient) {}

   listarTodos(page = 0, tamanho = 10) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('tamanho', tamanho.toString());

    return this.http
      .get<FrequenciasPage>(this.API, { params })
      .pipe(
        first(),
        tap((frequencias) => console.log(frequencias))
      );
  }
}
