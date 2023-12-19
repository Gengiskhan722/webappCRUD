import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMateriaScreenComponent } from './listar-materia-screen.component';

describe('ListarMateriaScreenComponent', () => {
  let component: ListarMateriaScreenComponent;
  let fixture: ComponentFixture<ListarMateriaScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarMateriaScreenComponent]
    });
    fixture = TestBed.createComponent(ListarMateriaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
