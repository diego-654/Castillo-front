import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialFormulario } from './historial-formulario';

describe('HistorialFormulario', () => {
  let component: HistorialFormulario;
  let fixture: ComponentFixture<HistorialFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialFormulario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialFormulario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
