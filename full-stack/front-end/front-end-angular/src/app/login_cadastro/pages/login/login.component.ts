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

  constructor(private router: Router, private loginService: LoginService) {
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
      window.alert('Preencha corretamente os campos!');
      return;
    }

    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => {
          this.router.navigate(['alunos']);
        },
        error: () =>
          window.alert('Erro inesperado! Tente novamente mais tarde'),
      });
  }

  navigate() {
    this.router.navigate(['login', 'cadastrar']);
  }
}
