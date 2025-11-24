import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAliado } from './formulario-aliado';

describe('FormularioAliado', () => {
  let component: FormularioAliado;
  let fixture: ComponentFixture<FormularioAliado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAliado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioAliado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
