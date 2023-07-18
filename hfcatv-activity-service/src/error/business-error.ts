/***
 * @file: 
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
export default class BusinessError implements Error {
  code: number;
  message: string;
  name: string;
  stack: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}
