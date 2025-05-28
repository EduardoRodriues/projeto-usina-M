import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-layout-padrao',
  templateUrl: './layout-padrao.component.html',
  styleUrls: ['./layout-padrao.component.scss']
})
export class LayoutPadraoComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() redirect: string = '';
  @Input() primaryBtnText: string = '';
  @Input() secondaryBtnText: string = '';
  @Input() disablePrimaryBtn: boolean = true;

  @Output() navigate = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  onNavigate() {
    this.navigate.emit();
  }

  onSubmit() {
    this.submit.emit();
  }
}
