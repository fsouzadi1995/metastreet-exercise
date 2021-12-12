import Axios, { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';
import { covalentBaseUrl as baseURL } from '../config/static.json';

const encoded = Buffer.from(import.meta.env.VITE_COVALENT_KEY as string).toString('base64');

const axios = Axios.create({
  baseURL,
  params: {
    key: import.meta.env.VITE_COVALENT_KEY,
  },
});

const SuccessResponseInterceptor = (res: AxiosResponse) => res.data;

axios.interceptors.response.use(SuccessResponseInterceptor);

export default axios;
