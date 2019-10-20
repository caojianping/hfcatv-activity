import {Schema, PaginateModel, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import bcrypt from "bcrypt";
import config from "config";
import {ManagerDocument} from "../interfaces";

const ManagerSchema: Schema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    createTime: {
        type: Schema.Types.Date,
        required: true
    },
    updateTime: {
        type: Schema.Types.Date,
        required: false
    },
    isDelete: {
        type: Schema.Types.Boolean,
        required: true
    }
}, {_id: true});

ManagerSchema.plugin(mongoosePaginate);

ManagerSchema.pre("save", function (this: ManagerDocument, next: Function) {
    const user = this;
    const salt = config.get<number>("salt");
    if (!user.isModified("password")) return next();

    new Promise<string>((resolve, reject) => {
        bcrypt.genSalt(salt, (err, salt) => {
            if (err) return reject(err);
            else resolve(salt);
        });
    }).then((salt: string) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            else {
                user.password = hash;
                next(null);
            }
        });
    });
});

ManagerSchema.pre("findOneAndUpdate", function (next) {
    this.setOptions({runValidators: true});
    next();
});

ManagerSchema.methods.validatePassword = function (this: ManagerDocument, password: string) {
    let result = bcrypt.compareSync(password, this.password);
    console.log("validatePassword:", password, this.password, result);
    return result;
};

export const ManagerModel: PaginateModel<ManagerDocument> = model("manager", ManagerSchema, "manager");
