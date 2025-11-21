import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresadosLayout } from './interesados-layout';

describe('InteresadosLayout', () => {
  let component: InteresadosLayout;
  let fixture: ComponentFixture<InteresadosLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteresadosLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteresadosLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
