import {orderStatus} from './const.js';

export const convertBase64UrlToBlob = function (dataUrl) {
    // 去掉url的头，并转换为byte
    var bytes = window.atob(dataUrl.split(',')[1]);
    // 处理异常,将ascii码小于0的转换为大于0
    var ab = new Uint8Array(bytes.length);
    for (var i = 0; i < bytes.length; i++) {
        ab[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {type: 'image/png'});
};

const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n;
};

export const dateFormat = function (time = 1511851701000, flag = false) {
    let date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    let str1 = [year, month, day].map(formatNumber).join('-');
    let str2 = [hour, minute, second].map(formatNumber).join(':');
    if (flag) {
        return `${str1} ${str2}`;
    }
    return str1;
};

/**
 * 根据订单状态返回中文意思
 * @method orderStatusToChinese
 */
export const orderStatusToChinese = function (status) {
    switch (status) {
        case orderStatus.ADMISSIBLE_STATUS:
            return '待受理';

        case orderStatus.INSTALLING_STATUS:
            return '安装中';

        case orderStatus.PROBLEM_ORDER_STATUS:
            return '问题订单';

        case orderStatus.CANCLE_ORDER_STATUS:
            return '撤单';

        case orderStatus.COMPLETED_STATUS:
            return '已完工';

        case orderStatus.INSTALLING_FAILED_STATUS:
            return '安装失败';

        case orderStatus.UNDER_REVIEW_STATUS:
            return '审核中';

        case orderStatus.REVIEW_FAILED_STATUS:
            return '审核失败';

        case orderStatus.REVIEW_COMPLETED_STATUS:
            return '审核完成';

        case orderStatus.ACCOUNT_PAID_STATUS:
            return '已付款';
    }
};