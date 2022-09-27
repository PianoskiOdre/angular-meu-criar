import { Injectable } from '@angular/core';
import { 
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HTTPStatus {

  private requestInFligh$: BehaviorSubject<boolean>;

  constructor() {
    this.requestInFligh$ = new BehaviorSubject<boolean>(false);
  }

  setHttpStatus(inFligh: boolean) {
    this.requestInFligh$.next(inFligh);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFligh$.asObservable();
  }
}

@Injectable()
export class HTTPListener implements HttpInterceptor {
  private _requests = 0;
  auth: any;

  constructor(
    private status: HTTPStatus,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    ++this._requests;
    this.status.setHttpStatus(true);
    return next.handle(req).pipe(
      map(event => {
        return event;
      }),
      catchError(error => {
        if (error.status === 401) {
          this.auth.setToken(null);
          this.auth.setRedirectUrl(this.router.url);
          this.router.navigate(['']);
        }

        return throwError(error);
      }),
      finalize(()=> {
        --this._requests;
        this.status.setHttpStatus(this._requests > 0);
      })
    );
  }
}
@Injectable()
export class AuthInterceptor {
  static acessoToken = '';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthInterceptor.acessoToken}`
      }
    });

    return next.handle(request);
  }
}
