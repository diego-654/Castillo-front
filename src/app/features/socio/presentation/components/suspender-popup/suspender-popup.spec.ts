import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenderPopup } from './suspender-popup';

describe('SuspenderPopup', () => {
  let component: SuspenderPopup;
  let fixture: ComponentFixture<SuspenderPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuspenderPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspenderPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
