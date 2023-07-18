import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Urls} from "../common/urls";
import {AwardVO, LottoDocument, PaginateResult} from "../interfaces";
import {HttpService} from "./http.service";

@Injectable({
    providedIn: "root"
})
export class LottoService {
    constructor(private httpService: HttpService) {
    }

    getPageLottos(conditions: any, page: number, limit: number)
        : Observable<PaginateResult<LottoDocument<any, AwardVO>>> {
        return this.httpService
        .post<PaginateResult<LottoDocument<any, AwardVO>>>(
            `${Urls.lotto.list}/${page}/${limit}`, conditions);
    }

    setStatus(id: string, status: number)
        : Observable<LottoDocument<any, AwardVO>> {
        return this.httpService
        .post<LottoDocument<any, AwardVO>>(Urls.lotto.setStatus, {id: id, status: status});
    }

    sendRedPacket(id: string): Observable<boolean> {
        return this.httpService.post<boolean>(Urls.lotto.sendRedPacket, {id: id});
    }
}
