import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WodsDetailComponent } from './wods-detail.component';

describe('WodsDetailComponent', () => {
  let component: WodsDetailComponent;
  let fixture: ComponentFixture<WodsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WodsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WodsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
