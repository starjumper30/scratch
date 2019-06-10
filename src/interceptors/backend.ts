import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const users: User[] = [
            { noobid: 1, username: 'noob', password: 'wolfrider', firstName: 'Leonardo', lastName: 'Raphael' }
        ];

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer simulate-jwt-token');

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate - public
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
                if (!user) return error('Username or password is incorrect');
                return checker({
                    noobid: user.noobid,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: `simulate-jwt-token`
                });
            }

            // get all users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                if (!isLoggedIn) return unauthorised();
                return checker(users);
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
        // call materialize and dematerialize to ensure delay even if an error is thrown #copied
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

        function checker(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }
}

export let backendProvider = { // How to provide this separately??
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: BackendInterceptor,
    multi: true
};