import axios from 'axios';
import interceptors from './interceptors';
const paths={
  BASE_URL:"",
}

const instance = axios.create({
  baseURL: paths.BASE_URL,
  timeout: 60 * 1000,
  validateStatus: status => true,
  headers: {
    from: 'client',
  },
});

interceptors.init(instance);

export default instance;
