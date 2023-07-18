import { Schema, PaginateModel, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import crypto from "crypto";
import config from "config";
import { RoleTypeKeys } from "../../common/keys";
import { Console } from "../../common/logger";
import { ManagerDocument } from "../interfaces";

const ManagerSchema: Schema = new Schema(
  {
    username: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.Number,
      required: true,
      enum: RoleTypeKeys,
      validate: [
        function (value: number) {
          return RoleTypeKeys.indexOf(value) > -1;
        },
        "无效的角色类型",
      ],
    },
    createTime: {
      type: Schema.Types.Date,
      required: true,
    },
    updateTime: {
      type: Schema.Types.Date,
      required: false,
    },
    isDelete: {
      type: Schema.Types.Boolean,
      required: true,
    },
  },
  { _id: true }
);

ManagerSchema.plugin(mongoosePaginate);

ManagerSchema.pre("save", function (this: ManagerDocument, next: Function) {
  const user = this;
  if (!user.isModified("password")) return next();

  let hmac = crypto.createHmac("sha512", config.get<string>("salt")),
    encryptPassword = hmac.update(user.password).digest("hex");
  user.password = encryptPassword;
  return next();
});

ManagerSchema.pre("findOneAndUpdate", function (next) {
  this.setOptions({ runValidators: true });
  next();
});

ManagerSchema.methods.validatePassword = function (this: ManagerDocument, password: string) {
  let hmac = crypto.createHmac("sha512", config.get<string>("salt")),
    comparePassword = hmac.update(password).digest("hex");
  Console.info(
    `validatePassword: ${password}, ${comparePassword}, ${this.password}, ${comparePassword === this.password}`
  );
  return this.password === comparePassword;
};

export const ManagerModel: PaginateModel<ManagerDocument> = model("manager", ManagerSchema, "manager");
