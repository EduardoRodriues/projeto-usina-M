import { Alunos } from '../../containers/alunos/models/alunos';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-alunos-lista',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterOutlet],
  templateUrl: './alunos-lista.component.html',
  styleUrl: './alunos-lista.component.scss',
})
export class AlunosListaComponent {
  @Input() alunos: Alunos[] = [];

  displayedColumns: string[] = ['nome', 'email', 'actions'];

  constructor() {}

  addAluno() {}

  updateAndDelete(aluno: Alunos) {
    console.log('Editar ou excluir:', aluno);
  }
}
