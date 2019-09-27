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

const token = TokenHelper.getToken();
const httpOptions = {
	headers: new HttpHeaders({
		"Content-Type": "application/json",
		"Authorization": token ? `Bearer ${token}` : ""
	})
};

@Injectable({
	providedIn: "root"
})
export default class HttpService {
	constructor(private http: HttpClient) {
	}

	public get<T>(url: string): Observable<any> {
		console.log("http.get args:", url);
		return this.http.get(url, httpOptions).pipe(
			map((res: any) => this.handleResponse<T>(res)),
			catchError(this.handleError)
		);
	}

	public post<T>(url: string, data: any): Observable<any> {
		console.log("http.post args:", url, data);
		return this.http.post(url, data, httpOptions).pipe(
			map((res: any) => this.handleResponse<T>(res)),
			catchError(this.handleError)
		);
	}

	private handleResponse<T>(res: any) {
		console.log("http res:", typeof res, res);
		let result: ResponseResult<any> = <ResponseResult<any>>res;
		if (result.code !== 200) throw new Error(result.message);
		return <T>result.data;
	}

	private handleError(error: HttpErrorResponse) {
		console.log("http error:", error);
		let message = error.message;
		if (error.error instanceof ErrorEvent) {
			message = error.error.message;
		}
        console.log("http message:", message);
		return throwError(message);
	}
}
