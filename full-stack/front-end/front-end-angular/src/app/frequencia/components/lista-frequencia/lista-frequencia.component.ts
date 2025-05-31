import { MatTableModule } from '@angular/material/table';
import { Frequencias } from './../../containers/frequencia/models/frequencia';
import { Component, Output, Input, EventEmitter, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-lista-frequencia',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    MatSelectModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './lista-frequencia.component.html',
  styleUrl: './lista-frequencia.component.scss',
})
export class ListaFrequenciaComponent {
  @Input() frequencias: Frequencias[] = [];
  @Output() presencaChange = new EventEmitter<{ id: number; presente: boolean; data: string }>();
  @Output() edit = new EventEmitter<Frequencias>();
  @Output() delete = new EventEmitter<Frequencias>();

  hoje: string = new Date().toISOString().split('T')[0];
  openedDropdownIndex: number | null = null;

  onTogglePresenca(frequencia: Frequencias) {
    const novoValor = !frequencia.presenteHoje;
    this.presencaChange.emit({
      id: frequencia.alunoId,
      presente: novoValor,
      data: this.hoje,
    });
  }

  toggleDropdown(index: number) {
    this.openedDropdownIndex = this.openedDropdownIndex === index ? null : index;
  }

  editFrequencia(frequencia: Frequencias) {
    this.edit.emit(frequencia);
    this.openedDropdownIndex = null;
  }

  deleteFrequencia(frequencia: Frequencias) {
    this.delete.emit(frequencia);
    this.openedDropdownIndex = null;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.actions-dropdown')) {
      this.openedDropdownIndex = null;
    }
  }
}
