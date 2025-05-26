import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPadraoComponent } from './layout-padrao.component';

describe('LayoutPadraoComponent', () => {
  let component: LayoutPadraoComponent;
  let fixture: ComponentFixture<LayoutPadraoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutPadraoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutPadraoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
