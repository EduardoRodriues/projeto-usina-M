import { Alunos } from '../../containers/alunos/models/alunos';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-alunos-lista',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    MatSelectModule,
    CommonModule,
    MatMenuModule,
  ],
  templateUrl: './alunos-lista.component.html',
  styleUrl: './alunos-lista.component.scss',
})
export class AlunosListaComponent {
  @Input() alunos: Alunos[] = [];

  buttonUpdateOrDelete!: boolean;

  displayedColumns: string[] = ['nome', 'email', 'actions'];

  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  constructor() {}

  addAluno() {
    this.add.emit(true);
  }

  editAluno(aluno: Alunos) {
    this.edit.emit(aluno);
  }

  deleteAluno(aluno: Alunos) {
    this.delete.emit(aluno);
  }
}
