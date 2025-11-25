import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovarPopup } from './renovar-popup';

describe('RenovarPopup', () => {
  let component: RenovarPopup;
  let fixture: ComponentFixture<RenovarPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenovarPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenovarPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
