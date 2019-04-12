import instance from './instance';
/**
 * originalUrl: 为SHA256加密所加，主要用于保存原始的接口路径
 */
const methods = ['post', 'put', 'delete'];
const xhr = {
  get(url) {
    return instance({
      method: 'get',
      originalUrl: url,
      url,
    });
  },
};

for (let i = 0; i < methods.length; i += 1) {
  const method = methods[i];
  xhr[method] = (url, data) => instance({
    method,
    url,
    data,
    originalUrl: url,
  });
}

export default xhr;

