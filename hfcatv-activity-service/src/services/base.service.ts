import {Schema, Model, model} from "mongoose";

export default class BaseService<T extends Model<any>>{
    model: T;

    constructor(model: T){
        this.model = model;
    }
};