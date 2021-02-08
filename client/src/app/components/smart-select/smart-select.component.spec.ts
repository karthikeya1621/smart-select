import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartSelectComponent } from './smart-select.component';

describe('SmartSelectComponent', () => {
  let component: SmartSelectComponent;
  let fixture: ComponentFixture<SmartSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
