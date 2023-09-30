import { type User } from "./User";
export interface RootGetters {
    getFilteredData: User[];
    getPaginatedData: User[];
    getTotalRecords: number;
    getSearchByCategories: { id: string; category: string }[];
}