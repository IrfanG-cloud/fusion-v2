import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceTileComponent } from './workspace-tile.component';

describe('WorkspaceTileComponent', () => {
  let component: WorkspaceTileComponent;
  let fixture: ComponentFixture<WorkspaceTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
