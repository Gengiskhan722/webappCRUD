import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaScreenComponent } from './materia-screen.component';

describe('MateriaScreenComponent', () => {
  let component: MateriaScreenComponent;
  let fixture: ComponentFixture<MateriaScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MateriaScreenComponent]
    });
    fixture = TestBed.createComponent(MateriaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
