import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Urls} from "../common/urls";
import {ActivityDocument, AwardVO, PaginateResult} from "../interfaces";
import {HttpService} from "./http.service";

@Injectable({
    providedIn: "root"
})
export class ActivityService {
    constructor(private httpService: HttpService) {
    }

    getPageActivities(conditions: any, page: number, limit: number)
        : Observable<PaginateResult<ActivityDocument<AwardVO>>> {
        return this.httpService
        .post<PaginateResult<ActivityDocument<AwardVO>>>(
            `${Urls.activity.list}/${page}/${limit}`, conditions);
    }

    addActivity(activity: ActivityDocument<AwardVO>)
        : Observable<ActivityDocument<AwardVO>> {
        return this.httpService
        .post<ActivityDocument<AwardVO>>(Urls.activity.add, activity);
    }

    updateActivity(activity: ActivityDocument<AwardVO>)
        : Observable<ActivityDocument<AwardVO>> {
        return this.httpService
        .post<ActivityDocument<AwardVO>>(Urls.activity.update, activity);
    }

    removeActivity(id: string): Observable<boolean> {
        return this.httpService
        .post<boolean>(Urls.activity.remove, {id: id});
    }

    setSwitch(id: string, switcher: boolean): Observable<boolean> {
        return this.httpService
        .post<boolean>(Urls.activity.setSwitch, {id: id, switch: switcher});
    }

    setAward(id: string, award: any): Observable<boolean> {
        return this.httpService
        .post<boolean>(Urls.activity.setAward, {id, award});
    }

    removeAward(id: string, awardId: string): Observable<boolean> {
        return this.httpService
        .post<boolean>(Urls.activity.removeAward, {id, awardId});
    }
}
