import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlVideoplayerComponent } from './url-videoplayer.component';

describe('UrlVideoplayerComponent', () => {
  let component: UrlVideoplayerComponent;
  let fixture: ComponentFixture<UrlVideoplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrlVideoplayerComponent]
    });
    fixture = TestBed.createComponent(UrlVideoplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
