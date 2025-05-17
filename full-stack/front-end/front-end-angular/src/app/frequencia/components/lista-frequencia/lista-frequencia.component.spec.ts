import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFrequenciaComponent } from './lista-frequencia.component';

describe('ListaFrequenciaComponent', () => {
  let component: ListaFrequenciaComponent;
  let fixture: ComponentFixture<ListaFrequenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFrequenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFrequenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
