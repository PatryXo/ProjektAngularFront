import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentShowingComponent } from './current-showing.component';

describe('CurrentShowingComponent', () => {
  let component: CurrentShowingComponent;
  let fixture: ComponentFixture<CurrentShowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentShowingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
