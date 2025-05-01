import { Alunos } from '../../containers/alunos/models/alunos';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alunos-lista',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './alunos-lista.component.html',
  styleUrl: './alunos-lista.component.scss',
})
export class AlunosListaComponent {
  

}
