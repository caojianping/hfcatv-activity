import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpHeaders, HttpClient, HttpErrorResponse} from '@angular/common/http';
import Token from "../common/token";

const token = Token.getToken();
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": token ? `Bearer ${token}` : ""
    })
};

@Injectable({
    providedIn: 'root'
})
export default class HttpService {
    constructor(private http: HttpClient) {
    }

    public get(url: string): Observable<any> {
        return this.http.get(url, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    public post(url: string, data: any): Observable<any> {
        console.log("login 333:", url, data, this.http);
        return this.http.post(url, data, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    public put(url: string, data: any): Observable<any> {
        return this.http.put(url, data, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    public delete(url: string): Observable<{}> {
        return this.http.delete(url, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    private extractData(res: Response) {
        console.log("cjp res:", res);
        let body = res;
        return body || {};
    }

    private handleError(error: HttpErrorResponse) {
        console.log("cjp err:", error);
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
        return throwError('Something bad happened; please try again later.');
    }
}
