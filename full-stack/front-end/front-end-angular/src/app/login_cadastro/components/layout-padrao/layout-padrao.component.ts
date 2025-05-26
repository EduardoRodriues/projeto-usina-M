import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-layout-padrao',
  imports: [],
  templateUrl: './layout-padrao.component.html',
  styleUrl: './layout-padrao.component.scss'
})
export class LayoutPadraoComponent {

  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();

  @Output("navigate") onNavigate = new EventEmitter();

  submit(){
    this.onSubmit.emit();
  }

  navigate(){
    this.onNavigate.emit();
  }

}
