import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DosanoprocesadaComponent } from './dosanoprocesada.component';

describe('DosanoprocesadaComponent', () => {
  let component: DosanoprocesadaComponent;
  let fixture: ComponentFixture<DosanoprocesadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DosanoprocesadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DosanoprocesadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
