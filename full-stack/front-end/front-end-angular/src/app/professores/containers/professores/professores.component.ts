import { Component, ViewChild } from '@angular/core';
import { HeaderPadraoComponent } from '../../../layouts/header-padrao/header-padrao.component';
import { SidebarComponent } from '../../../layouts/sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProfessoresPage } from './model/professores-page';
import { ProfessoresServiceService } from '../../services/professores-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  tap,
} from 'rxjs';
import { ErrorDialogComponent } from '../../../alunos/error/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from '../../../alunos/components/confirmation-dialog/confirmation-dialog.component';
import { Professores } from './model/professores';
import { ProfessoresListaComponent } from '../../components/professores-lista/professores-lista.component';
import { HeaderPadraoFormsComponent } from '../../../layouts/header-padrao-forms/header-padrao-forms.component';

@Component({
  selector: 'app-professores',
  imports: [
    RouterOutlet,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HeaderPadraoComponent,
    SidebarComponent,
    ProfessoresListaComponent,
  ],
  templateUrl: './professores.component.html',
  styleUrl: './professores.component.scss',
})
export class ProfessoresComponent {
  professores: Observable<ProfessoresPage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  nomeFilter = new FormControl('');

  constructor(
    private professoresService: ProfessoresServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.nomeFilter.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.pageIndex = 0;
        this.refresh();
      });

    this.refresh();
  }

  refresh(
    pageEvent: PageEvent = {
      length: 0,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    }
  ) {
    const filtroNome = this.nomeFilter.value || '';
    this.professores = this.professoresService
      .listarTodos(pageEvent.pageIndex, pageEvent.pageSize, filtroNome)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        catchError(() => {
          this.onError('Erro ao carregar professores');
          return of({ alunos: [], totalElements: 0, totalPages: 0 });
        })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  addProfessores() {
    this.router.navigate(['/professores/novo']);
  }

  editProfessores(professores: Professores) {
    this.router.navigate(['/professores/editar', professores._id]);
  }

  deleteProfessores(professores: Professores) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse professor?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.professoresService.remove(professores._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Professor removido com sucesso!', 'x', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['custom-snackbar'],
            });
          },
          () => this.onError('Erro ao remover professor!')
        );
      }
    });
  }
}
