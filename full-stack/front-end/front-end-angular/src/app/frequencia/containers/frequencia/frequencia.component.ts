import { Component, ViewChild, OnInit } from '@angular/core';
import { FrequenciasPage } from './models/frequencia-page';
import { FrequenciaService } from '../../services/frequencia.service';
import { MatDialog } from '@angular/material/dialog';
import {
  MatPaginator,
  PageEvent,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  tap,
  startWith,
  Observable,
} from 'rxjs';
import { ErrorDialogComponent } from '../../../alunos/error/error-dialog/error-dialog.component';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ListaFrequenciaComponent } from '../../components/lista-frequencia/lista-frequencia.component';
import { HeaderPadraoComponent } from "../../../layouts/header-padrao/header-padrao.component";
import { HeaderPadraoFormsComponent } from "../../../layouts/header-padrao-forms/header-padrao-forms.component";
import { AlunosListaComponent } from "../../../alunos/components/alunos-lista/alunos-lista.component";
import { SidebarComponent } from "../../../layouts/sidebar/sidebar.component";

@Component({
  selector: 'app-frequencia',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HeaderPadraoFormsComponent,
    ListaFrequenciaComponent,
    SidebarComponent
],
  templateUrl: './frequencia.component.html',
  styleUrls: ['./frequencia.component.scss'],
})
export class FrequenciaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  frequencias: Observable<FrequenciasPage> | null = null;

  searchControl = new FormControl('');
  pageIndex = 0;
  pageSize = 10;

  constructor(
    private frequenciasService: FrequenciaService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.frequencias = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term) =>
        this.frequenciasService
          .listarTodos(
            this.pageIndex,
            this.pageSize,
            this.searchControl.value ?? ''
          )
          .pipe(
            catchError(() => {
              this.onError('Erro ao carregar frequências');
              return of({
                alunos: [],
                totalElements: 0,
                totalPages: 0,
              } as FrequenciasPage);
            })
          )
      ),
      tap(() => {
        this.pageIndex = 0;
        if (this.paginator) this.paginator.firstPage();
      })
    );
  }

  refresh(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.frequencias = this.frequenciasService
      .listarTodos(
        this.pageIndex,
        this.pageSize,
        this.searchControl.value || ''
      )
      .pipe(
        catchError(() => {
          this.onError('Erro ao carregar frequências');
          return of({
            alunos: [],
            totalElements: 0,
            totalPages: 0,
          } as FrequenciasPage);
        })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  atualizarPresenca(event: { id: number; presente: boolean }) {
  this.frequenciasService.registrarPresenca(event.id, event.presente)
    .subscribe({
      next: () => {
        this.frequencias = this.frequenciasService.listarTodos(this.pageIndex, this.pageSize, this.searchControl.value || '');
      },
      error: () => this.onError('Erro ao atualizar presença'),
    });
}



}
