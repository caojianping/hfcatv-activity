import mongoose from "mongoose";
import bluebird from "bluebird";
import config from "config";
import {Console} from "./common/logger";

class Database {
	public static connect() {
		(<any>mongoose).Promise = bluebird;
		let uri = config.get<string>(`services.${process.env.NODE_ENV}.mongodb`);
		return mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true})
			.then(() => Console.info("Connected to MongoDB"))
			.catch(err => Console.info(`MongoDB connection error: ${err}`));
	}
}

export default Database;
