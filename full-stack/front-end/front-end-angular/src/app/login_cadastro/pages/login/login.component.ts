import { Component } from '@angular/core';
import { LayoutPadraoComponent } from '../../components/layout-padrao/layout-padrao.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { PrimeiroInputComponent } from '../../components/primeiro-input/primeiro-input.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface LoginForm {
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-login',
  imports: [LayoutPadraoComponent, ReactiveFormsModule, PrimeiroInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(private router: Router, private loginService: LoginService, private snackBar: MatSnackBar) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
  if (this.loginForm.invalid) {
    this.snackBar.open('Preencha corretamente os campos!', 'Fechar', {
      duration: 3000,
      panelClass: ['snackbar-warning'],
    });
    return;
  }

  this.loginService
    .login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe({
      next: () => {
        this.router.navigate(['alunos']);
      },
      error: () => {
        this.snackBar.open('Erro inesperado! Tente novamente mais tarde', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
}


  navigate() {
    this.router.navigate(['login', 'cadastrar']);
  }
}
