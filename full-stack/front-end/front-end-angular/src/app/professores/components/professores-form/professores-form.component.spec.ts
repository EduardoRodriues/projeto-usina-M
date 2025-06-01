import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessoresFormComponent } from './professores-form.component';

describe('ProfessoresFormComponent', () => {
  let component: ProfessoresFormComponent;
  let fixture: ComponentFixture<ProfessoresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessoresFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
