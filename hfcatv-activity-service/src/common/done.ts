/***
 * @file: 
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
export default function done(resolve, reject) {
  return function (err, data) {
    if (err) reject(err);
    else resolve(data);
  };
}
