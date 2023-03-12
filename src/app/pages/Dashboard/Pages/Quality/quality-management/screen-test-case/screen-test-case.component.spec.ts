import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTestCaseComponent } from './screen-test-case.component';

describe('ScreenTestCaseComponent', () => {
  let component: ScreenTestCaseComponent;
  let fixture: ComponentFixture<ScreenTestCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenTestCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenTestCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
