import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstdosaComponent } from './lstdosa.component';

describe('LstdosaComponent', () => {
  let component: LstdosaComponent;
  let fixture: ComponentFixture<LstdosaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstdosaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstdosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
