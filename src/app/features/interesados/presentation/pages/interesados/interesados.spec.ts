import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Interesados } from './interesados';

describe('Interesados', () => {
  let component: Interesados;
  let fixture: ComponentFixture<Interesados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Interesados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Interesados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
