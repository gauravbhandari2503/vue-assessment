import BaseService from './base.service';
import { type AxiosResponse } from 'axios';

export default class BlogService extends BaseService {
  static getUsers(): Promise<any> {
    return super
      .getAxiosClient()
      .get('users')
      .then((response: AxiosResponse<any>) => response.data)
      .catch((error: any) => error);
  }
}
