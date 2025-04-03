import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutchComponent } from './dutch.component';

describe('DutchComponent', () => {
  let component: DutchComponent;
  let fixture: ComponentFixture<DutchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DutchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DutchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
