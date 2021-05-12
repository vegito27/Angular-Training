import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagiationComponent } from './pagiation.component';

describe('PagiationComponent', () => {
  let component: PagiationComponent;
  let fixture: ComponentFixture<PagiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagiationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
