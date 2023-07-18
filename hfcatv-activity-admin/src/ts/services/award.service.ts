import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Urls} from "../common/urls";
import {AwardDocument, PaginateResult} from "../interfaces";
import {HttpService} from "./http.service";

@Injectable({
    providedIn: "root"
})
export class AwardService {
    constructor(private httpService: HttpService) {
    }

    getAwards(): Observable<Array<AwardDocument>> {
        return this.httpService.get<Array<AwardDocument>>(Urls.award.list);
    }

    getPageAwards(conditions: any, page: number, limit: number): Observable<PaginateResult<AwardDocument>> {
        return this.httpService.post<PaginateResult<AwardDocument>>(`${Urls.award.list}/${page}/${limit}`, conditions);
    }

    addAward(award: AwardDocument): Observable<AwardDocument> {
        return this.httpService.post<AwardDocument>(Urls.award.add, award);
    }

    updateAward(award: AwardDocument): Observable<AwardDocument> {
        return this.httpService.post<AwardDocument>(Urls.award.update, award);
    }

    removeAward(id: string): Observable<boolean> {
        return this.httpService.post<AwardDocument>(Urls.award.remove, {id: id});
    }
}
