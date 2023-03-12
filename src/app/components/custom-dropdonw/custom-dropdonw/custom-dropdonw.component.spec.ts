import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDropdonwComponent } from './custom-dropdonw.component';

describe('CustomDropdonwComponent', () => {
  let component: CustomDropdonwComponent;
  let fixture: ComponentFixture<CustomDropdonwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDropdonwComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDropdonwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
