import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProfessoresServiceService } from '../../services/professores-service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormUtilsService } from '../../../alunos/form/form-utils.service';
import { Professores } from '../../containers/professores/model/professores';
import { HeaderPadraoFormsComponent } from '../../../layouts/header-padrao-forms/header-padrao-forms.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-professores-form',
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
    HeaderPadraoFormsComponent,
  ],
  templateUrl: './professores-form.component.html',
  styleUrl: './professores-form.component.scss',
})
export class ProfessoresFormComponent {
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private service: ProfessoresServiceService,
    private sanackbar: MatSnackBar,
    public formUtils: FormUtilsService
  ) {}

  ngOnInit(): void {
    const professores: Professores = this.route.snapshot.data['professor'];
    this.form = this.formBuilder.group({
      _id: [professores._id],
      nome: [
        professores.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      email: [professores.email, [Validators.required, Validators.email]],
      cpf: [
        professores.cpf,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      contato: [
        professores.contato,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
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
    this.sanackbar.open('Professor salvo com sucesso!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError() {
    this.sanackbar.open('Erro ao salvar professor', '', { duration: 3000 });
  }
}
