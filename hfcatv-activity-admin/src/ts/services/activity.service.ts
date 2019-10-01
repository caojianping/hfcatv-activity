import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Urls} from "../common/urls";
import {ActivityDocument, AwardVO, PaginateResult} from "../interfaces";
import HttpService from "./http.service";

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

	addActivity(data: ActivityDocument<AwardVO>)
        : Observable<ActivityDocument<AwardVO>> {
		return this.httpService
            .post<ActivityDocument<AwardVO>>(Urls.activity.add, data);
	}

	updateActivity(data: ActivityDocument<AwardVO>)
        : Observable<ActivityDocument<AwardVO>> {
		return this.httpService
            .post<ActivityDocument<AwardVO>>(Urls.activity.update, data);
	}

	removeActivity(id: string): Observable<boolean> {
		return this.httpService
            .post<boolean>(Urls.activity.remove, {id: id});
	}
}
