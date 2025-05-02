import { Alunos } from '../../containers/alunos/models/alunos';
import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  constructor() {}

  addAluno() {
    this.add.emit(true);
  }

  updateOrDelete() {

  }
}
