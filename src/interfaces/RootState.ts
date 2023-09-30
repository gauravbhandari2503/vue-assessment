import {type User} from '../interfaces/User';
import {type Pagination} from '../interfaces/Pagination';
export interface RootState {
    users: User[];
    searchQuery: string;
    pagination: Pagination;
    searchByFilter: string;
 }