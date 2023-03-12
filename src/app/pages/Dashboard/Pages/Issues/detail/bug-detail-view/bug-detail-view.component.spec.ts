import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugDetailViewComponent } from './bug-detail-view.component';

describe('BugDetailViewComponent', () => {
  let component: BugDetailViewComponent;
  let fixture: ComponentFixture<BugDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugDetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
