import {Injectable} from "@angular/core";
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {TokenHelper} from "../helpers";

class ResponseResult<T> {
    code: number;
    data: T;
    message: string;
    trace: string;
}

@Injectable({
    providedIn: "root"
})
export class HttpService {
    constructor(private http: HttpClient) {
    }

    private setHeaders() {
        let token = TokenHelper.getToken(),
            headers = {"Content-Type": "application/json"};
        if (token) {
            headers["Authorization"] = token ? `Bearer ${token}` : "";
        }
        return {headers: new HttpHeaders(headers)};
    }

    private handleResponse<T>(res: any) {
        let result: ResponseResult<any> = <ResponseResult<any>>res,
            code = result.code;
        if (code === 200) return <T>result.data;
        throw result;
    }

    private handleError(error: any) {
        let message = error.message;

        let rerror: any = error.error;
        if (rerror instanceof ErrorEvent) {
            message = rerror.message;
        }

        let code = error.code;
        if (typeof code === "number") {
            message = error.message;
            if (code === 401) {
                message = "登录状态已经失效，请重新登录";
                window.location.href = "#/login";
                TokenHelper.removeToken();
            }
        }
        return throwError(message);
    }

    public get<T>(url: string): Observable<any> {
        return this.http.get(url, this.setHeaders()).pipe(
            map((res: any) => this.handleResponse<T>(res)),
            catchError(this.handleError)
        );
    }

    public post<T>(url: string, data: any): Observable<any> {
        return this.http.post(url, data, this.setHeaders()).pipe(
            map((res: any) => this.handleResponse<T>(res)),
            catchError(this.handleError)
        );
    }
}
