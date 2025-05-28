import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPadraoComponent } from './header-padrao.component';

describe('HeaderPadraoComponent', () => {
  let component: HeaderPadraoComponent;
  let fixture: ComponentFixture<HeaderPadraoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPadraoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPadraoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
