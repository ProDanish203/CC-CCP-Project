import api from "./middleware";

export interface CreateDataEntryParams {
  title: string;
  description?: string;
  value: number;
  image?: File;
}

export interface UpdateDataEntryParams {
  title?: string;
  description?: string;
  value?: number;
  image?: File;
}

export interface DataEntry {
  _id: string;
  title: string;
  description: string;
  value: number;
  image: string | null;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DataEntriesResponse {
  success: boolean;
  message: string;
  data: DataEntry[];
  pagination: {
    totalItems: number;
    perPage: number;
    totalPages: number;
    currentPage: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export const createDataEntry = async (
  params: CreateDataEntryParams
): Promise<{ success: boolean; response: string | DataEntry }> => {
  try {
    const formData = new FormData();
    formData.append("title", params.title);
    if (params.description) {
      formData.append("description", params.description);
    }
    formData.append("value", params.value.toString());
    if (params.image) {
      formData.append("image", params.image);
    }

    const { data } = await api.post("/data-entries", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.success) {
      return {
        success: true,
        response: data.data,
      };
    } else {
      return {
        success: false,
        response: data.message,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      response: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const getDataEntries = async (
  page: number = 1,
  search: string = ""
): Promise<{ success: boolean; response: string | DataEntriesResponse }> => {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", "10");
    if (search) {
      params.append("search", search);
    }

    const { data } = await api.get(`/data-entries?${params.toString()}`, {
      withCredentials: true,
    });

    if (data.success) {
      return {
        success: true,
        response: {
          success: data.success,
          message: data.message,
          data: data.data,
          pagination: data.pagination,
        },
      };
    } else {
      return {
        success: false,
        response: data.message,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      response: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const getDataEntry = async (
  id: string
): Promise<{ success: boolean; response: string | DataEntry }> => {
  try {
    const { data } = await api.get(`/data-entries/${id}`, {
      withCredentials: true,
    });

    if (data.success) {
      return {
        success: true,
        response: data.data,
      };
    } else {
      return {
        success: false,
        response: data.message,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      response: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const updateDataEntry = async (
  id: string,
  params: UpdateDataEntryParams
): Promise<{ success: boolean; response: string | DataEntry }> => {
  try {
    const formData = new FormData();
    if (params.title !== undefined) {
      formData.append("title", params.title);
    }
    if (params.description !== undefined) {
      formData.append("description", params.description);
    }
    if (params.value !== undefined) {
      formData.append("value", params.value.toString());
    }
    if (params.image) {
      formData.append("image", params.image);
    }

    const { data } = await api.put(`/data-entries/${id}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.success) {
      return {
        success: true,
        response: data.data,
      };
    } else {
      return {
        success: false,
        response: data.message,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      response: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const deleteDataEntry = async (
  id: string
): Promise<{ success: boolean; response: string }> => {
  try {
    const { data } = await api.delete(`/data-entries/${id}`, {
      withCredentials: true,
    });

    if (data.success) {
      return {
        success: true,
        response: data.message,
      };
    } else {
      return {
        success: false,
        response: data.message,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      response: error.response?.data?.message || "Something went wrong",
    };
  }
};

