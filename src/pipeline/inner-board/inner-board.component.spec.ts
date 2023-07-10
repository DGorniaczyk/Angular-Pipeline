import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerBoardComponent } from './inner-board.component';

describe('InnerBoardComponent', () => {
  let component: InnerBoardComponent;
  let fixture: ComponentFixture<InnerBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InnerBoardComponent]
    });
    fixture = TestBed.createComponent(InnerBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
