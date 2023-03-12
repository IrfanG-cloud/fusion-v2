import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityScreenDetailComponent } from './quality-screen-detail.component';

describe('QualityScreenDetailComponent', () => {
  let component: QualityScreenDetailComponent;
  let fixture: ComponentFixture<QualityScreenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityScreenDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityScreenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
