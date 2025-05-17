import { Component, ViewChild } from '@angular/core';
import { FrequenciasPage } from './models/frequencia-page';
import { FrequenciaService } from '../../services/frequencia.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AlunosListaComponent } from '../../../alunos/components/alunos-lista/alunos-lista.component';
import { MatButtonModule } from '@angular/material/button';
import { ListaFrequenciaComponent } from '../../components/lista-frequencia/lista-frequencia.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { catchError, Observable, of, tap } from 'rxjs';
import { ErrorDialogComponent } from '../../../alunos/error/error-dialog/error-dialog.component';

@Component({
  selector: 'app-frequencia',
  imports: [ RouterOutlet,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    ListaFrequenciaComponent,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,],
  templateUrl: './frequencia.component.html',
  styleUrl: './frequencia.component.scss'
})
export class FrequenciaComponent {
  frequencias: Observable<FrequenciasPage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  constructor(
    private frequenciasService: FrequenciaService,
    public dialog: MatDialog
  ) {
    this.refresh();
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
  this.frequencias = this.frequenciasService
    .listarTodos(pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError((error) => {
        this.onError('Erro ao carregar frequencias');
        return of({ alunos: [], totalElements: 0, totalPages: 0 } as FrequenciasPage);
      })
    );
}


  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  addAluno() {

  }
}
