import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WodSearchComponent } from './wod-search.component';

describe('WodSearchComponent', () => {
  let component: WodSearchComponent;
  let fixture: ComponentFixture<WodSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WodSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WodSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
