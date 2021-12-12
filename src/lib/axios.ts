import Axios, { AxiosResponse } from 'axios';
import { covalentBaseUrl as baseURL } from '../config/static.json';

const axios = Axios.create({
  baseURL,
  params: {
    key: String(import.meta.env.VITE_COVALENT_KEY),
  },
});

const SuccessResponseInterceptor = (res: AxiosResponse) => res.data;

axios.interceptors.response.use(SuccessResponseInterceptor);

export default axios;
