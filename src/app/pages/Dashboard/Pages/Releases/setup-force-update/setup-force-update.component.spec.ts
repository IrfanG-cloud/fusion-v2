import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupForceUpdateComponent } from './setup-force-update.component';

describe('SetupForceUpdateComponent', () => {
  let component: SetupForceUpdateComponent;
  let fixture: ComponentFixture<SetupForceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupForceUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupForceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
