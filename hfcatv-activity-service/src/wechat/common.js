function print(err, data) {
    console.log("err:--->%j\r\ndata:----%j", err, data);
}

function printOne(data) {
    console.log("%s:--->%j", new Date().toString(), data);
}

function dumpObj(obj) {
    for (var key in obj) {
        console.log("%s->%s", key, typeof obj[key]);
    }
}

function toElementString(key, val, isCDATA) {
    if (isCDATA) {
        val = "<![CDATA[{good_detail:" + val + "}]]>"
    }
    return "<" + key + ">" + val + "</" + key + ">";
}

function toElementStringNew(key, val, useCDATA, expects) {
    expects = expects || [];
    if (useCDATA && expects.indexOf(key) < 0) {
        val = "<![CDATA[" + val + "]]>"
    }
    return "<" + key + ">" + val + "</" + key + ">";
}

function toXml(arr, spliter) {
    spliter = spliter == undefined ? "" : spliter;
    return "<xml>" + spliter + arr.join(spliter) + spliter + "</xml>";
}

function sha1(str, encode) {
    encode = encode || "hex";
    var h = require('crypto').createHash('sha1');
    return h.update(str).digest(encode);
}

function rassha1(str, key, encode) {
    encode = encode || "hex";
    var sign = require("crypto").createSign("RSA-SHA1");
    sign.update(str, 'utf-8');
    return sign.sign(key, encode);
}

function MD5(str, encode) {
    encode = encode || "hex";
    var h = require('crypto').createHash('md5');
    return h.update(str, "utf-8").digest(encode);
}

function randomString(len, hasUpper, onlydata) {
    len = len || 32;
    hasUpper = !!hasUpper;
    onlydata = !!onlydata;
    var sources = hasUpper ? "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678" : 'abcdefhijkmnprstwxyz2345678';
    sources = onlydata ? "0123456789" : sources;
    var maxPos = sources.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += sources.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function sign(obj, key) {
    var arr = [];
    Object.keys(obj).forEach(function (key) {
        if (key !== "sign" && obj[key]) {
            arr.push(key + "=" + obj[key]);
        }
    })
    arr.sort();
    var strA = arr.join("&");
    strA = strA + "&key=" + key;
    return MD5(strA).toUpperCase();
}

function signZfb(obj, key) {
    var arr = [];
    Object.keys(obj).forEach(function (key) {
        if (key !== "sign" && obj[key]) {
            arr.push(key + "=" + (typeof obj[key] === "object" ? JSON.stringify(obj[key]) : obj[key]));
        }
    })
    arr.sort();
    var strA = arr.join("&");
    return rassha1(strA, key, "base64");
}

function checksignZfb(obj, serverPublickey) {
    if (!("sign" in obj)) return false;
    var arr = [];
    Object.keys(obj).forEach(function (key) {
        if (key !== "sign" && key != "sign_type" && obj[key]) {
            arr.push(key + "=" + (typeof obj[key] === "object" ? JSON.stringify(obj[key]) : obj[key]));
        }
    })
    arr.sort();
    var strA = arr.join("&");
    var verify = require("crypto").createVerify("RSA-SHA1");
    verify.update(strA, 'utf-8');
    return verify.verify(serverPublickey, obj["sign"], "base64");
}

function checkSign(obj, key) {
    if ("sign" in obj)
        return obj.sign === sign(obj, key);
    return true;
}

function sleep(ms) {
    return function (cb) {
        setTimeout(cb, ms);
    }
}

/*Promise化回调函数*/
function promiseify(fn) {
    return function () {
        var args = [].slice.call(arguments);
        return new Promise(function () {
            args.push((function (resolve, reject) {
                return function (err, data) {
                    if (err) reject(err);
                    else resolve(data);
                }
            })(arguments[0], arguments[1]));
            fn.apply(null, args);
        });
    }
}


/*以下函数供测试用*/
var inc = function (n, callback, timeout) {
    //将参数n自增1之后的结果返回给async
    timeout = timeout || 200;
    setTimeout(function () {
        callback(null, n + 1);
    }, timeout);
};

var fire = function (obj, callback, timeout) {
    //直接将obj的内容返回给async
    timeout = timeout || 200;
    setTimeout(function () {
        callback(null, obj);
    }, timeout);
};

var err = function (errMsg, callback, timeout) {
    //模拟一个错误的产生，让async各个函数末尾的callback接收到。
    timeout = timeout || 200;
    setTimeout(function () {
        callback(errMsg);
    }, timeout);
};

// utils
var log = function (msg, obj) {
    //对console.log进行了封装。主要是增加了秒钟的输出，通过秒数的差值方便大家对async的理解。
    process.stdout.write(moment().format('ss.SSS') + '> ');
    if (obj !== undefined) {
        process.stdout.write(msg);
        console.log(obj);
    } else {
        console.log(msg);
    }
};

var wait = function (mils) {
    //刻意等待mils的时间，mils的单位是毫秒。
    var now = new Date;
    while (new Date - now <= mils) ;
}

function date2Str(date, fmt) { //author: meizz
    fmt = fmt || "yyyy-MM-dd HH:mm:ss";
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours() >= 12 ? date.getHours() - 12 : date.getHours(), //小时
        "H+": date.getHours(),//小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


module.exports = {
    print: print,
    dumpObj: dumpObj,
    sha1: sha1,
    randomString: randomString,
    printOne: printOne,
    sleep: sleep,
    promiseify: promiseify,
    inc: inc,
    fire: fire,
    err: err,
    wait: wait,
    log: log,
    sign: sign,
    signZfb: signZfb,
    checkSign: checkSign,
    checkSignZfb: checksignZfb,
    toXmlElementString: toElementString,
    toElementStringNew: toElementStringNew,
    toXml: toXml,
    date2Str: date2Str
}
