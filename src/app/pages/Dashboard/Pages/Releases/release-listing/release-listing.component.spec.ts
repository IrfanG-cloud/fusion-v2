import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseListingComponent } from './release-listing.component';

describe('ReleaseListingComponent', () => {
  let component: ReleaseListingComponent;
  let fixture: ComponentFixture<ReleaseListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaseListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
