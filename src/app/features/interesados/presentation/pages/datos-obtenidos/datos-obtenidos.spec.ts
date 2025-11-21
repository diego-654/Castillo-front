import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosObtenidos } from './datos-obtenidos';

describe('DatosObtenidos', () => {
  let component: DatosObtenidos;
  let fixture: ComponentFixture<DatosObtenidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosObtenidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosObtenidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
