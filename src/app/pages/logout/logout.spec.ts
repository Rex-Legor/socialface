import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import { AuthState } from '../../state/reducers/auth.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { logout } from '../../state/actions/auth.actions';
import { Router, RouterModule } from '@angular/router';
import { authSelectorKey } from '../../state/selectors/auth.selector';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let store: MockStore<AuthState>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutComponent, RouterModule],
      providers: [
        provideMockStore({
          initialState: {
            [authSelectorKey]: {
              user: null,
              loading: false,
            },
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {});

  it('Should handle logout', () => {
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);

    jest.spyOn(store, 'dispatch');
    jest.spyOn(router, 'navigate');

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(logout());
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
