import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagadoresComponent } from './pagadores.component';

describe('PagadoresComponent', () => {
  let component: PagadoresComponent;
  let fixture: ComponentFixture<PagadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
