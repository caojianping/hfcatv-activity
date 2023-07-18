import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Urls} from "../common/urls";
import {PaginateResult, UserDocument} from "../interfaces";
import {HttpService} from "./http.service";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private httpService: HttpService) {
    }

    getPageUsers(conditions: any, page: number, limit: number): Observable<PaginateResult<UserDocument>> {
        return this.httpService.post<PaginateResult<UserDocument>>(`${Urls.user.list}/${page}/${limit}`, conditions);
    }

    setLottoCount(id: string, lottoCount: number)
        : Observable<UserDocument> {
        return this.httpService
        .post<UserDocument>(Urls.user.setLottoCount, {id: id, lottoCount: lottoCount});
    }
}
