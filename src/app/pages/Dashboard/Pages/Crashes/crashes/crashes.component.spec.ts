import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrashesComponent } from './crashes.component';

describe('CrashesComponent', () => {
  let component: CrashesComponent;
  let fixture: ComponentFixture<CrashesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrashesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrashesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
