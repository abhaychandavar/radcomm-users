import axios, { type AxiosInstance } from 'axios';
import appConfig from '../../config/appConfig';

const gatewayUrl: string = appConfig.gatewayUrl;

const mkAxios = (): AxiosInstance => {
  return axios.create({
    baseURL: gatewayUrl,
    headers: {
        Authorization: `Bearer ${appConfig.internalAuthToken}`,
      },
  });
};

export default mkAxios();
