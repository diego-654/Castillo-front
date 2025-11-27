import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarProviderComponent } from './snackbar-provider.component';

describe('SnackbarProviderComponent', () => {
  let component: SnackbarProviderComponent;
  let fixture: ComponentFixture<SnackbarProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
