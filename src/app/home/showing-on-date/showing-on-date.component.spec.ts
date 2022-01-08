import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingOnDateComponent } from './showing-on-date.component';

describe('ShowingOnDateComponent', () => {
  let component: ShowingOnDateComponent;
  let fixture: ComponentFixture<ShowingOnDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowingOnDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingOnDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
