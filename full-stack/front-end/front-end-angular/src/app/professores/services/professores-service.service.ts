import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfessoresPage } from '../containers/professores/model/professores-page';
import { first, tap } from 'rxjs';
import { Professores } from '../containers/professores/model/professores';

@Injectable({
  providedIn: 'root'
})
export class ProfessoresServiceService {
  private readonly API = 'api/professores';

  constructor(private http: HttpClient) {}

  listarTodos(page = 0, tamanho = 10, nome = '') {
  return this.http
    .get<ProfessoresPage>(this.API, {
      params: {
        page: page.toString(),
        tamanho: tamanho.toString(),
        nome
      }
    })
    .pipe(
      first(),
      tap((professores) => console.log(professores))
    );
}


  save(record: Partial<Professores>) {
    if (record._id) {
      return this.edit(record);
    }

    return this.create(record);
  }

  buscarId(id: string) {
    return this.http.get<Professores>(`${this.API}/${id}`);
  }

  remove(id: string) {
    return this.http.delete<Professores>(`${this.API}/${id}`);
  }

  private create(record: Partial<Professores>) {
    return this.http.post<Professores>(this.API, record);
  }

  private edit(record: Partial<Professores>) {
    return this.http.put<Professores>(`${this.API}/${record._id}`, record);
  }
}
