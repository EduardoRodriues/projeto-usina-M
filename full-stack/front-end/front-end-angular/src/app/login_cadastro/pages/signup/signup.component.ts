import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { PrimeiroInputComponent } from '../../components/primeiro-input/primeiro-input.component';
import { LayoutPadraoComponent } from '../../components/layout-padrao/layout-padrao.component';

function passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
  const senha = formGroup.get('senha')?.value;
  const confSenha = formGroup.get('confSenha')?.value;
  return senha === confSenha ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [LayoutPadraoComponent, ReactiveFormsModule, PrimeiroInputComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private router: Router, private loginService: LoginService) {
    this.signupForm = new FormGroup(
      {
        nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confSenha: new FormControl('', [Validators.required]),
      },
      { validators: passwordMatchValidator }
    );
  }

  submit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { nome, email, senha } = this.signupForm.value;

    this.loginService.signup(nome, email, senha).subscribe({
      next: () => {
        alert('Cadastro feito com sucesso!');
        this.router.navigate(['login']);
      },
      error: () => alert('Erro ao cadastrar. Tente novamente.'),
    });
  }

  navigate() {
    this.router.navigate(['login']);
  }
}
