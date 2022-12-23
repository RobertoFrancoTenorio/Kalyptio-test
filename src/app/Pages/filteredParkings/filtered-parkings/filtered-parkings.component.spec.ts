import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredParkingsComponent } from './filtered-parkings.component';

describe('FilteredParkingsComponent', () => {
  let component: FilteredParkingsComponent;
  let fixture: ComponentFixture<FilteredParkingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredParkingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredParkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
