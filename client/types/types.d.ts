export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: string;
  search?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface IPagination {
  totalItems: number;
  perPage: number;
  totalPages: number;
  currentPage: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  name: string;
  avatar?: string;
  hasNotifications: boolean;
  isEmailVerified: boolean;
}
