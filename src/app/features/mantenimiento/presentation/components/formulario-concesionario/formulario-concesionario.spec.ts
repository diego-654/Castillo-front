import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioConcesionario } from './formulario-concesionario';

describe('FormularioConcesionario', () => {
  let component: FormularioConcesionario;
  let fixture: ComponentFixture<FormularioConcesionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioConcesionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioConcesionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
