const ErrorType = {
    ParameterRequired: {
        code: 800,
        message: "参数不可以为空"
    },
    DataInexistence: {
        code: 801,
        message: "数据不存在"
    },
    DataExist: {
        code: 802,
        message: "数据已存在"
    },
    InvalidType: {
        code: 803,
        message: "无效的类型"
    },
    Others: {
        code: 999,
        message: "其它异常"
    }
};

export default ErrorType;