import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios';

export default class BaseService {
  static getAxiosClient(): AxiosInstance {
    const axiosClient: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_APP_ROOT_API as string,
    });

    // Auth header check can be added here if needed.
    axiosClient.defaults.headers.common = {
      Accept: 'application/json',
    };

    axiosClient.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (!error.response) {
          return Promise.reject('Please check your internet');
        }

        // Handle different status code errors here.

        return Promise.reject(error);
      }
    );

    return axiosClient;
  }
}
