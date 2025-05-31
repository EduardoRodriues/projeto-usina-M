import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-padrao',
  imports: [],
  templateUrl: './header-padrao.component.html',
  styleUrl: './header-padrao.component.scss'
})
export class HeaderPadraoComponent {

  @Input() classe: string = '';
  @Input() gestao: string = '';

}
