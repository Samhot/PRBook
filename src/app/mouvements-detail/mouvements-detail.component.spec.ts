import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementsDetailComponent } from './mouvements-detail.component';

describe('MouvementsDetailComponent', () => {
  let component: MouvementsDetailComponent;
  let fixture: ComponentFixture<MouvementsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouvementsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
