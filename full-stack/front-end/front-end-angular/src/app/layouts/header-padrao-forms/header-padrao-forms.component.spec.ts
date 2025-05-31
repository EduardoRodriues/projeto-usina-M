import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPadraoFormsComponent } from './header-padrao-forms.component';

describe('HeaderPadraoFormsComponent', () => {
  let component: HeaderPadraoFormsComponent;
  let fixture: ComponentFixture<HeaderPadraoFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPadraoFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPadraoFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
