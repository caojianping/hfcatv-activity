var fs = require('fs');
var path = require('path');
var request = require("request");
var xml2js = require("xml2js");

var common = require("./common");
var _config = require("./config.json");

/*创建订单号含时间因子*/
function creatTradeNo(len) {
    len = len || 32;
    var str = Date.now().toString();
    return (len - str.length < 0 ? str.substr(-len) : str + common.randomString(len - str.length));
}

/*发送红包*/
function sendRedPacket(userOpenId, total, act_name, remark, wishing) {
    var certFile = path.join(__dirname, "cert", "apiclient_cert.pem"),
        keyFile = path.join(__dirname, "cert", "apiclient_key.pem");

    var opt = Object.assign({}, _config.redpacket, {
        nonce_str: common.randomString(32),
        re_openid: userOpenId,
        total_amount: total,
        total_num: 1,
        wishing: wishing || "感谢您参与活动，希望给您来带来快乐!",
        act_name: act_name || "迎新人活动",
        remark: remark || "推荐有更多红包哦",
        mch_billno: creatTradeNo(16)
    });
    opt.sign = common.sign(opt, _config.key);

    //riskifno 需要encode
    var arr = Object.keys(opt).map(function (key) {
        return common.toElementStringNew(key, opt[key], true, ["risk_info"]);
    });
    var sendBody = common.toXml(arr, "\n");
    var options = {
        headers: {"Connection": "close"},
        url: 'https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack',
        method: 'POST',
        cert: fs.readFileSync(certFile),
        key: fs.readFileSync(keyFile),
        body: sendBody
    };
    return new Promise(function (resolve, reject) {
        request.post(options, sendBody, function (err, res, body) {
            if (err) reject(err);
            else {
                xml2js.parseString(body, {explicitArray: false}, function (err, json) {
                    json = json.xml;
                    if (err) reject(err);
                    else {
                        if (json.return_code.toLocaleLowerCase() === "success" &&
                            json.result_code.toLocaleLowerCase() === "success") resolve(json);
                        else reject(json.err_code_des);
                    }
                });
            }
        });
    });
}

module.exports = {
    sendRedPacket: sendRedPacket
};