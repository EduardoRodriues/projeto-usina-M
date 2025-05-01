import { Component } from '@angular/core';
import { AlunosListaComponent } from '../../components/alunos-lista/alunos-lista.component';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Alunos } from './models/alunos';
import { AlunosService } from '../../services/alunos.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-alunos',
  imports: [RouterOutlet, MatCardModule, CommonModule, MatTableModule],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss',
  standalone: true
})
export class AlunosComponent {
  alunos: Observable<Alunos[]>;

  displayedColumns: string[] = ['nome', 'email'];

  constructor(private alunosService: AlunosService) {
    this.alunos = this.alunosService.listarTodos();
  }

  ngOnInit() {
  }
}
