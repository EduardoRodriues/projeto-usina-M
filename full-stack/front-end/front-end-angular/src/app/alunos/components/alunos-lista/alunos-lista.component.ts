import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostListener } from '@angular/core';
import { Alunos } from '../../containers/alunos/models/alunos';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

import { ContatoPipePipe } from '../../../pipes/contato-pipe/contato-pipe.pipe';
import { CpfPipePipe } from '../../../pipes/cpf-pipe/cpf-pipe.pipe';

@Component({
  selector: 'app-alunos-lista',
  templateUrl: './alunos-lista.component.html',
  styleUrls: ['./alunos-lista.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    MatSelectModule,
    CommonModule,
    MatMenuModule,
    ContatoPipePipe,
    CpfPipePipe,
  ],
})
export class AlunosListaComponent {
  @Input() alunos: Alunos[] = [];

  openedDropdownIndex: number | null = null;

  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<Alunos>();
  @Output() delete = new EventEmitter<Alunos>();

  addAluno() {
    this.add.emit(true);
  }

  editAluno(aluno: Alunos) {
    this.edit.emit(aluno);
    this.openedDropdownIndex = null;
  }

  deleteAluno(aluno: Alunos) {
    this.delete.emit(aluno);
    this.openedDropdownIndex = null;
  }

  toggleDropdown(index: number) {
    this.openedDropdownIndex = this.openedDropdownIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideMenu = target.closest('.actions-dropdown');

    if (!clickedInsideMenu) {
      this.openedDropdownIndex = null;
    }
  }
}
