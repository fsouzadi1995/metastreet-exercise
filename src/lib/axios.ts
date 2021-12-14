import Axios, { AxiosResponse } from 'axios';

const axios = Axios.create({
  params: {
    key: String(import.meta.env.VITE_COVALENT_KEY),
  },
});

const SuccessResponseInterceptor = (res: AxiosResponse) => res.data;

axios.interceptors.response.use(SuccessResponseInterceptor);

export default axios;
