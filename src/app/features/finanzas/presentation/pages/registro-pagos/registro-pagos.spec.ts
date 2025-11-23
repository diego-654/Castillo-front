import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPagos } from './registro-pagos';

describe('RegistroPagos', () => {
  let component: RegistroPagos;
  let fixture: ComponentFixture<RegistroPagos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPagos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPagos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
