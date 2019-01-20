import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIssueComponent } from './all-issue.component';

describe('AllIssueComponent', () => {
  let component: AllIssueComponent;
  let fixture: ComponentFixture<AllIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
