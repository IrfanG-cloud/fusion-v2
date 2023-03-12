import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProfileSettingComponent } from './manage-profile-setting.component';

describe('ManageProfileSettingComponent', () => {
  let component: ManageProfileSettingComponent;
  let fixture: ComponentFixture<ManageProfileSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProfileSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProfileSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
