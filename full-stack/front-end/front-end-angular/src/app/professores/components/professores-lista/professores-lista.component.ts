import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Professores } from '../../containers/professores/model/professores';
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
  selector: 'app-professores-lista',
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
  templateUrl: './professores-lista.component.html',
  styleUrl: './professores-lista.component.scss',
})
export class ProfessoresListaComponent {
  @Input() professores: Professores[] = [];

  openedDropdownIndex: number | null = null;

  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<Professores>();
  @Output() delete = new EventEmitter<Professores>();

  addProfessor() {
    this.add.emit(true);
  }

  editProfessor(professor: Professores) {
    this.edit.emit(professor);
    this.openedDropdownIndex = null;
  }

  deleteProfessor(professor: Professores) {
    this.delete.emit(professor);
    this.openedDropdownIndex = null;
  }

  toggleDropdown(index: number) {
    this.openedDropdownIndex =
      this.openedDropdownIndex === index ? null : index;
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
