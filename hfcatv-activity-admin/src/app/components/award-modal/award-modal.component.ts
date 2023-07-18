import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";
import {Utils} from "../../../ts/common/utils";
import {AwardType, OperateType} from "../../../ts/common/enums";
import {AwardExpireTypes, AwardTypes, OperateTypes} from "../../../ts/common/names";
import {AwardDocument} from "../../../ts/interfaces";

@Component({
    selector: "app-award-modal",
    templateUrl: "./award-modal.component.html",
    styleUrls: ["./award-modal.component.less"]
})
export class AwardModalComponent implements OnInit {
    @Input() type: OperateType;
    @Input() visible: boolean;
    @Input() award?: AwardDocument;

    @Output() onCancel = new EventEmitter<void>();
    @Output() onOk = new EventEmitter<AwardDocument>();

    AwardTypes: Array<string> = AwardTypes;
    AwardExpireTypes: Array<string> = AwardExpireTypes;
    OperateTypes: Array<string> = OperateTypes;
    awardForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private message: NzMessageService
    ) {
        this.awardForm = this.formBuilder.group({
            name: new FormControl(null, Validators.required),
            type: new FormControl(null, Validators.required),
            title: new FormControl(null),
            desc: new FormControl(null),
            value: new FormControl(null),
            expire: this.formBuilder.group({
                type: new FormControl(null),
                days: new FormControl(null),
                startDate: new FormControl(null),
                endDate: new FormControl(null)
            }),
            minimum: new FormControl(null),
            maximum: new FormControl(null)
        });
    }

    ngOnInit() {
    }

    _handleAward(formData: any) {
        let formDataDup = Utils.duplicate(formData),
            {type, expire, minimum, maximum} = formDataDup;

        delete formDataDup.expire;
        delete formDataDup.minimum;
        delete formDataDup.maximum;

        let rangesData, expireData;
        if (type === AwardType.RedPacket) {
            if (minimum === undefined || minimum === null || maximum === undefined || maximum === null) {
                this.message.warning("红包最小、最大额度不可以为空");
                return;
            }
            if (minimum > maximum) {
                this.message.warning("红包最小额度不可以大于红包最大额度");
                return;
            }

            rangesData = [minimum, maximum];
        }

        if (type !== AwardType.Nothing) {
            let {type: expireType, days, startDate, endDate} = expire;
            if (expireType === 0) {
                if (days === undefined || days === null) {
                    this.message.warning("有奖期不可以为空");
                    return;
                }

                expireData = days;
            } else if (expireType === 1) {
                if (!startDate || !endDate) {
                    this.message.warning("日期范围不可以为空");
                    return;
                }
                if (startDate > endDate) {
                    this.message.warning("开始日期不可以大于结束日期");
                    return;
                }

                expireData = [startDate, endDate]
            }
        }

        formDataDup["expire"] = expireData;
        formDataDup["ranges"] = rangesData;

        for (let key in formDataDup) {
            if (formDataDup[key] === null || formDataDup[key] === undefined) {
                delete formDataDup[key];
            }
        }
        return formDataDup;
    }

    openAward() {
        let type = this.type;
        if (type === OperateType.Add) {
            this.awardForm = this.formBuilder.group({
                name: new FormControl(null, Validators.required),
                type: new FormControl(null, Validators.required),
                title: new FormControl(null),
                desc: new FormControl(null),
                value: new FormControl(null),
                expire: this.formBuilder.group({
                    type: new FormControl(null),
                    days: new FormControl(null),
                    startDate: new FormControl(null),
                    endDate: new FormControl(null)
                }),
                minimum: new FormControl(null),
                maximum: new FormControl(null)
            });
        } else if (type === OperateType.Edit) {
            let award = this.award;
            if (award) {
                const {type: awardType, expire, ranges} = award;
                let expireType;
                if (typeof expire === "number") {
                    expireType = 0;
                } else if (Array.isArray(expire)) {
                    expireType = 1;
                }

                this.awardForm = this.formBuilder.group({
                    name: new FormControl(award.name, Validators.required),
                    type: new FormControl(award.type, Validators.required),
                    title: new FormControl(award.title),
                    desc: new FormControl(award.desc),
                    value: new FormControl(award.value),
                    expire: this.formBuilder.group({
                        type: new FormControl(expireType),
                        days: new FormControl(expireType === 0 ? expire : null),
                        startDate: new FormControl(expireType === 1 ? new Date(expire[0]) : null),
                        endDate: new FormControl(expireType === 1 ? new Date(expire[1]) : null)
                    }),
                    minimum: new FormControl(awardType === AwardType.RedPacket ? ranges[0] : null),
                    maximum: new FormControl(awardType === AwardType.RedPacket ? ranges[1] : null)
                });
            }
        }
    }

    closeAward() {
        this.onCancel.emit();
    }

    saveAward(formData: any) {
        if (!this.awardForm.valid) {
            for (const i in this.awardForm.controls) {
                this.awardForm.controls[i].markAsDirty();
                this.awardForm.controls[i].updateValueAndValidity();
            }
            return;
        }

        let type = this.type;
        if (type === OperateType.Add) {
            let data = this._handleAward(formData);
            if (data) {
                this.onOk.emit(<AwardDocument>data);
            }
        } else if (type === OperateType.Edit) {
            formData["_id"] = this.award._id;
            let data = this._handleAward(formData);
            if (data) {
                this.onOk.emit(<AwardDocument>data);
            }
        }
    }
}
