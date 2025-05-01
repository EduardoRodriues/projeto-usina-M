import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alunos } from '../containers/alunos/models/alunos';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private readonly API = 'api/alunos';

  constructor(private http: HttpClient) { }

  listarTodos() {
    return this.http.get<Alunos[]>(this.API).pipe(
      first()
    );
  }
}
