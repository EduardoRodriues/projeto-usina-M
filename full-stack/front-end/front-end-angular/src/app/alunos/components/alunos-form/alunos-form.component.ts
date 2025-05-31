import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule, Location } from '@angular/common';
import { Alunos } from '../../containers/alunos/models/alunos';
import { AlunosService } from '../../services/alunos.service';
import { FormUtilsService } from '../../form/form-utils.service';
import { HeaderPadraoFormsComponent } from "../../../layouts/header-padrao-forms/header-padrao-forms.component";

@Component({
  selector: 'app-alunos-form',
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatSnackBarModule,
    CommonModule,
    MatSnackBarModule,
    HeaderPadraoFormsComponent
],
  templateUrl: './alunos-form.component.html',
  styleUrl: './alunos-form.component.scss',
})
export class AlunosFormComponent {
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private service: AlunosService,
    private sanackbar: MatSnackBar,
    public formUtils: FormUtilsService
  ) {}

  ngOnInit(): void {
    const aluno: Alunos = this.route.snapshot.data['aluno'];
    this.form = this.formBuilder.group({
      _id: [aluno._id],
      nome: [
        aluno.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      email: [aluno.email, [Validators.required, Validators.email]],
      cpf: [
        aluno.cpf,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      dataNascimento: [
        aluno.dataNascimento,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      contato: [
        aluno.contato,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      genero: [aluno.genero || 'Masculino', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(
        () => this.onSuccess(),
        () => this.onError()
      );
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.sanackbar.open('Curso salvo com sucesso!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError() {
    this.sanackbar.open('Erro ao salvar curso', '', { duration: 3000 });
  }
}
