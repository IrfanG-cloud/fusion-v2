import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrashDetailViewComponent } from './crash-detail-view.component';

describe('CrashDetailViewComponent', () => {
  let component: CrashDetailViewComponent;
  let fixture: ComponentFixture<CrashDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrashDetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrashDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
