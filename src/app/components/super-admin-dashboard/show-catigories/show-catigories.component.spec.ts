import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCatigoriesComponent } from './show-catigories.component';

describe('ShowCatigoriesComponent', () => {
  let component: ShowCatigoriesComponent;
  let fixture: ComponentFixture<ShowCatigoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCatigoriesComponent]
    });
    fixture = TestBed.createComponent(ShowCatigoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
