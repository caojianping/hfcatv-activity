import mongoose from "mongoose";
import bluebird from "bluebird";
import config from "config";
import {Console} from "./common/logger";

class Database {
	public static connect() {
		(<any>mongoose).Promise = bluebird;
		let user = config.get<string>("mongodb.user"),
			password = config.get<string>("mongodb.password"),
			host = config.get<string>("mongodb.host"),
			port = config.get<number>("mongodb.port"),
			database = config.get<string>("mongodb.database"),
			uri = `mongodb://${user}:${password}@${host}:${port}/${database}`;
		return mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true})
			.then(() => Console.info("Connected to MongoDB"))
			.catch(err => Console.info(`MongoDB connection error: ${err}`));
	}
}

export default Database;
