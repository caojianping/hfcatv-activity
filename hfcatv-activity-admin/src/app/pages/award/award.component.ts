import {Component, OnInit} from "@angular/core";
import {NzMessageService} from "ng-zorro-antd";
import {AwardDocument, PaginateResult} from "../../../ts/interfaces";
import {AwardService} from "../../../ts/services";

@Component({
    selector: "app-award",
    templateUrl: "./award.component.html",
    styleUrls: ["./award.component.less"]
})
export class AwardComponent implements OnInit {
    isLoading: boolean = false;
    awardPageResult: PaginateResult<AwardDocument> = {
        docs: [],
        total: 0,
        limit: 10,
        page: 1
    };

    constructor(
        private message: NzMessageService,
        private awardService: AwardService
    ) {
    }

    fetchPageAwards() {
        console.log("abc:", arguments);
        const self = this;
        const {awardService, awardPageResult, message} = self;
        self.isLoading = true;
        awardService.getPageAwards(awardPageResult.page, awardPageResult.limit)
            .subscribe({
                next(result: PaginateResult<AwardDocument>) {
                    console.log("getPageAwards result:", result);
                    self.isLoading = false;
                    self.awardPageResult = result;
                },
                error(err: any) {
                    console.log("getPageAwards err:", err);
                    self.isLoading = false;
                    message.error(err);
                }
            })
    }

    ngOnInit() {
        this.fetchPageAwards();
    }
}
