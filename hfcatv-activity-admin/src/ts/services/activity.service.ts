import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Urls} from "../common/urls";
import {ActivityDocument, AwardDocument, PaginateResult} from "../interfaces";
import HttpService from "./http.service";

@Injectable({
	providedIn: "root"
})
export class ActivityService {
	constructor(private httpService: HttpService) {
	}

	getPageActivities(conditions: any, page: number, limit: number): Observable<PaginateResult<ActivityDocument>> {
		return this.httpService.post<PaginateResult<ActivityDocument>>(`${Urls.activity.list}/${page}/${limit}`, conditions);
	}

	addActivity(data: ActivityDocument): Observable<ActivityDocument> {
		return this.httpService.post<ActivityDocument>(Urls.activity.add, data);
	}

	updateActivity(data: ActivityDocument): Observable<ActivityDocument> {
		return this.httpService.post<ActivityDocument>(Urls.activity.update, data);
	}

	removeActivity(id: string): Observable<boolean> {
		return this.httpService.post<AwardDocument>(Urls.activity.remove, {id: id});
	}
}
