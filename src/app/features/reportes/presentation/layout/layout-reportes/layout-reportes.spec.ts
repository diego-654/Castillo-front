import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutReportes } from './layout-reportes';

describe('LayoutReportes', () => {
  let component: LayoutReportes;
  let fixture: ComponentFixture<LayoutReportes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutReportes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutReportes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
