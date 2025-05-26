import { AlunosListaComponent } from '../../components/alunos-lista/alunos-lista.component';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { Alunos } from './models/alunos';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AlunosService } from '../../services/alunos.service';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error/error-dialog/error-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { AlunosPage } from './models/alunos-page';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-alunos',
  imports: [
    RouterOutlet,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    AlunosListaComponent,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss',
  standalone: true,
})
export class AlunosComponent {
  alunos: Observable<AlunosPage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  nomeFilter = new FormControl('');

  constructor(
    private alunosService: AlunosService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.nomeFilter.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.pageIndex = 0;
      this.refresh();
    });

    this.refresh();
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: this.pageIndex, pageSize: this.pageSize }) {
    const filtroNome = this.nomeFilter.value || '';
    this.alunos = this.alunosService
      .listarTodos(pageEvent.pageIndex, pageEvent.pageSize, filtroNome)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        catchError(() => {
          this.onError('Erro ao carregar alunos');
          return of({ alunos: [], totalElements: 0, totalPages: 0 });
        })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  addAluno() {
    this.router.navigate(['/alunos/novo']);
  }

  editAluno(aluno: Alunos) {
    this.router.navigate(['/alunos/editar', aluno._id]);
  }

  deleteAluno(aluno: Alunos) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.alunosService.remove(aluno._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso!', 'x', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          () => this.onError('Erro ao remover curso!')
        );
      }
    });
  }
}
