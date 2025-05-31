import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-padrao-forms',
  imports: [],
  templateUrl: './header-padrao-forms.component.html',
  styleUrl: './header-padrao-forms.component.scss',
})
export class HeaderPadraoFormsComponent {
  @Input() title: string = '';
  @Input() gestao: string = '';
}
