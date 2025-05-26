import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { PrimeiroInputComponent } from '../../components/primeiro-input/primeiro-input.component';
import { LayoutPadraoComponent } from '../../components/layout-padrao/layout-padrao.component';

interface SignupForm {
  name: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
}

@Component({
  selector: 'app-signup',
  imports: [LayoutPadraoComponent, ReactiveFormsModule, PrimeiroInputComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(private router: Router, private loginService: LoginService) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    this.loginService
      .signup(
        this.signupForm.value.name,
        this.signupForm.value.email,
        this.signupForm.value.password
      )
      .subscribe({
        next: () => window.alert('Cadastro feito com sucesso!'),
        error: () =>
          window.alert('Erro inesperado! Tente novamente mais tarde'),
      });
  }

  navigate() {
    this.router.navigate(['login']);
  }
}
