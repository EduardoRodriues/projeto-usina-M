import { Component } from '@angular/core';
import { AlunosListaComponent } from '../../components/alunos-lista/alunos-lista.component';
import { ActivatedRoute, RouterOutlet, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Alunos } from './models/alunos';
import { AlunosService } from '../../services/alunos.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alunos',
  imports: [
    RouterOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    AlunosListaComponent,
  ],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss',
  standalone: true,
})
export class AlunosComponent {
  alunos: Observable<Alunos[]>;

  constructor(private alunosService: AlunosService, private route: ActivatedRoute, private router: Router) {
    this.alunos = this.alunosService.listarTodos();
  }

  ngOnInit() {}

  addAluno() {
    this.router.navigate(['/alunos/novo']);
  }
}
