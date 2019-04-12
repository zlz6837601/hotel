import {
  addUrlTimestamp,
  addAuthorization,
  changeResponseData,
  checkStatusAndNotify,
} from './utils';

export default {
  init(instance) {
    // requset
    // instance.interceptors.request.use((config) => {
      // addUrlTimestamp(config);
      // addAuthorization(config);
      // addHeaderToken(config);
    //   return config;
    // }, error => Promise.reject(error));

    // response
    instance.interceptors.response.use((response) => {
      // 统一处理各种错误
      if (response.config.method.toUpperCase() !== 'OPTIONS') {
        changeResponseData(response);
        checkStatusAndNotify(response);
      }
      return response.data;
    }, (error, stauts) => {
      console.log(error, stauts);
      // 统一显示“请检查网络”
      checkStatusAndNotify(error);
      return Promise.reject(error);
    });
  },
};

