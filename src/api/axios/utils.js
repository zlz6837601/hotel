import defaultExport, { SUCCESS_STATUS } from './xhr-status';


// 添加时间戳
export function addUrlTimestamp(config) {
  const timestamp = new Date().getTime();

  const { url, originalUrl } = config;
  const hash = url.indexOf('?') === -1 ? '?' : '&';

  config.url = `${url}${hash}t=${timestamp}`;
  config.originalUrl = `${originalUrl}${hash}t=${timestamp}`;
  return config;
}

// 添加用户标示
export function addAuthorization(config) {
  const {
    data,
    method,
    headers,
  } = config;
  if (method.toUpperCase() === 'POST') {
    data.userId = window.USER_ID;
  }
  if (window.AUTHORIZATION) {
    headers['Authorization'] = `bearer ${window.AUTHORIZATION}`;
  }
  return config;
}

const exportErrorMsg = (msg) => {
  if (window.$VUE) {
    window.$VUE.$Toast(msg);
  } else if (typeof window !== 'undefined') {
    /* eslint no-alert:0 */
    alert(msg);
  }
};

// 统一做一层转换
export function changeResponseData(response) {
  const { result, success } = response.data;
  response.data['data'] = result;
  response.data['isSuccess'] = success;
  return response;
}

// 统一处理 xhr 错误，并提示信息
export function checkStatusAndNotify(response) {
  const { data } = response;
  if (!data) {
    exportErrorMsg(defaultExport.error);
    return;
  }
  if (data.success !== SUCCESS_STATUS && data.error.message !== '') {
    const errMsg = data.error.message || defaultExport.error;
    exportErrorMsg(errMsg);
    return;
  }
}
