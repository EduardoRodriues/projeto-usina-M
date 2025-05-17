import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alunos } from '../containers/alunos/models/alunos';
import { first, tap } from 'rxjs';
import { AlunosPage } from '../containers/alunos/models/alunos-page';

@Injectable({
  providedIn: 'root',
})
export class AlunosService {
  private readonly API = 'api/alunos';

  constructor(private http: HttpClient) {}

  listarTodos(page = 10, tamanho = 10) {
    return this.http
      .get<AlunosPage>(this.API, { params: { page, tamanho } })
      .pipe(
        first(),
        tap((alunos) => console.log(alunos))
      );
  }

  save(record: Partial<Alunos>) {
    if (record._id) {
      return this.edit(record);
    }

    return this.create(record);
  }

  buscarId(id: string) {
    return this.http.get<Alunos>(`${this.API}/${id}`);
  }

  remove(id: string) {
    return this.http.delete<Alunos>(`${this.API}/${id}`);
  }

  private create(record: Partial<Alunos>) {
    return this.http.post<Alunos>(this.API, record);
  }

  private edit(record: Partial<Alunos>) {
    return this.http.put<Alunos>(`${this.API}/${record._id}`, record);
  }
}
