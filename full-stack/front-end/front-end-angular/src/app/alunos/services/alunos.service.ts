import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alunos } from '../containers/alunos/models/alunos';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlunosService {
  private readonly API = 'api/alunos';

  constructor(private http: HttpClient) {}

  listarTodos() {
    return this.http.get<Alunos[]>(this.API).pipe(first());
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

  private create(record: Partial<Alunos>) {
    return this.http.post<Alunos>(this.API, record);
  }

  private edit(record: Partial<Alunos>) {
    return this.http.put<Alunos>(`${this.API}/${record._id}`, record);
  }
}
