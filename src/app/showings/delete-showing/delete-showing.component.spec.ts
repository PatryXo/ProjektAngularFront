import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShowingComponent } from './delete-showing.component';

describe('DeleteShowingComponent', () => {
  let component: DeleteShowingComponent;
  let fixture: ComponentFixture<DeleteShowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteShowingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
