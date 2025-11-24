import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFactura } from './formulario-factura';

describe('FormularioFactura', () => {
  let component: FormularioFactura;
  let fixture: ComponentFixture<FormularioFactura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioFactura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioFactura);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
