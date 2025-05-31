import { LoginResponse } from './../../login_cadastro/types/login-response.type';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  nomeAdmin: string = '';

  ngOnInit(): void {
    const nome = sessionStorage.getItem('username');
    if (nome) {
      this.nomeAdmin = nome;
    }
  }
}
