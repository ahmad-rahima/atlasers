import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalInfoComponent } from './animal-info.component';

describe('AnimalInfoComponent', () => {
  let component: AnimalInfoComponent;
  let fixture: ComponentFixture<AnimalInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalInfoComponent]
    });
    fixture = TestBed.createComponent(AnimalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
