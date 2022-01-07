import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingDetalisComponent } from './showing-detalis.component';

describe('ShowingDetalisComponent', () => {
  let component: ShowingDetalisComponent;
  let fixture: ComponentFixture<ShowingDetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowingDetalisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
