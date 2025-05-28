import { MatTableModule } from '@angular/material/table';
import { Frequencias } from './../../containers/frequencia/models/frequencia';
import { Component, Output, Input, EventEmitter } from '@angular/core';
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

  buttonUpdateOrDelete!: boolean;

  displayedColumns: string[] = ['aluno', 'frequencia', 'actions'];

  @Output() add = new EventEmitter<boolean>();
  @Output() presencaChange = new EventEmitter<{ id: number; presente: boolean; data: string }>();


  hoje: string = new Date().toISOString().split('T')[0];

  onTogglePresenca(frequencia: Frequencias) {
    const novoValor = !frequencia.presenteHoje;
    this.presencaChange.emit({
      id: frequencia.alunoId,
      presente: novoValor,
      data: this.hoje,
    });
  }

  addPresenca() {
    this.add.emit(true);
  }
}
