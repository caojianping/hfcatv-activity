export default function done(resolve, reject) {
	return function (err, data) {
		if (err) reject(err);
		else resolve(data);
	};
}