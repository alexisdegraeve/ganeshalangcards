import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralcardComponent } from './generalcard.component';

describe('GeneralcardComponent', () => {
  let component: GeneralcardComponent;
  let fixture: ComponentFixture<GeneralcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
