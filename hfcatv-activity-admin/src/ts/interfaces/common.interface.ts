export interface BaseDocument {
	createTime: Date;
	updateTime?: Date;
	isDelete: boolean;
}