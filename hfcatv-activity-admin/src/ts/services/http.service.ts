import {Injectable} from "@angular/core";
import {HttpHeaders, HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {TokenHelper} from "../helpers";

interface ResponseResult<T> {
	code: number;
	data: T;
	message: string;
	trace: string;
}

@Injectable({
	providedIn: "root"
})
export default class HttpService {
	constructor(private http: HttpClient) {
	}

	private setHeaders() {
		let token = TokenHelper.getToken(),
			headers = {"Content-Type": "application/json"};
		if (token) {
			headers["Authorization"] = token ? `Bearer ${token}` : "";
		}
		console.log("HTTP Authorization:", token, headers);
		return {headers: new HttpHeaders(headers)};
	}

	private handleResponse<T>(res: any) {
		console.log("HTTP res:", typeof res, res);
		let result: ResponseResult<any> = <ResponseResult<any>>res,
			code = result.code;
		if (code === 200) return <T>result.data;

		if (code === 401) {
			TokenHelper.removeToken();
			window.location.href = "/login";
		}
		throw new Error(result.message);
	}

	private handleError(error: HttpErrorResponse) {
		console.log("HTTP error:", error);
		let message = error.message;
		if (error.error instanceof ErrorEvent) {
			message = error.error.message;
		}
		return throwError(message);
	}

	public get<T>(url: string): Observable<any> {
		console.log("GET args:", url);
		return this.http.get(url, this.setHeaders()).pipe(
			map((res: any) => this.handleResponse<T>(res)),
			catchError(this.handleError)
		);
	}

	public post<T>(url: string, data: any): Observable<any> {
		console.log("POST args:", url, data);
		return this.http.post(url, data, this.setHeaders()).pipe(
			map((res: any) => this.handleResponse<T>(res)),
			catchError(this.handleError)
		);
	}
}
