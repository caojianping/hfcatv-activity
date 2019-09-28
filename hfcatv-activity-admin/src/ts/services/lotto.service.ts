import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Urls} from "../common/urls";
import {LottoDocument, PaginateResult} from "../interfaces";
import HttpService from "./http.service";

@Injectable({
	providedIn: "root"
})
export class LottoService {
	constructor(private httpService: HttpService) {
	}

	getPageLottos(conditions: any, page: number, limit: number): Observable<PaginateResult<LottoDocument>> {
		return this.httpService.post<PaginateResult<LottoDocument>>(`${Urls.lotto.list}/${page}/${limit}`, conditions);
	}

	setStatus(id: string, status: number): Observable<LottoDocument> {
		return this.httpService.post<LottoDocument>(Urls.lotto.setStatus, {id: id, status: status});
	}
}