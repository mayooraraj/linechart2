import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglelinechartComponent } from './singlelinechart.component';

describe('SinglelinechartComponent', () => {
  let component: SinglelinechartComponent;
  let fixture: ComponentFixture<SinglelinechartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglelinechartComponent]
    });
    fixture = TestBed.createComponent(SinglelinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
