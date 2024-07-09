import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

const user = { id: '123', firstName: 'Test' };
const email = 'test@mail.com';

describe('AuthComponent', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should make login request', () => {
    service
      .login({ email, password: '123' })
      .subscribe((user) => expect(user).toBe(user));

    const req = httpMock.expectOne('/auth/login');
    req.flush(user);

    expect(req.request.method).toBe('POST');
  });

  it('Should make signup request', () => {
    service.signup(email).subscribe((user) => expect(user).toBe(user));

    const req = httpMock.expectOne('/auth/signup');
    req.flush(user);

    expect(req.request.method).toBe('POST');
  });

  it('Should make reset password request', () => {
    service.resetPassword(email).subscribe((resp) => expect(resp).toBe('done'));

    const req = httpMock.expectOne('/auth/reset-password');
    req.flush('done');

    expect(req.request.method).toBe('POST');
  });

  it('Should make update user request', () => {
    service
      .updateUser(user as any)
      .subscribe((resp) => expect(resp).toBe('done'));

    const req = httpMock.expectOne(`/api/user/update?id=${user.id}`);
    req.flush('done');

    expect(req.request.method).toBe('PUT');
  });
});
