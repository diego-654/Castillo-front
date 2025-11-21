import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderProviderComponent } from './loader-provider.component';

describe('LoaderProviderComponent', () => {
  let component: LoaderProviderComponent;
  let fixture: ComponentFixture<LoaderProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
