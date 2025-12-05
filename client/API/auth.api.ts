import api from "./middleware";

export const register = async ({
  name,
  email,
  password,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const { data } = await api.post(
      "/auth/register",
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

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
      response: error.response.data.message || "something went wrong",
    };
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await api.post(
      "/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

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
      response: error.response.data.message || "something went wrong",
    };
  }
};

export const logout = async () => {
  try {
    const { data } = await api.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );

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
      response: error.response.data.message || "something went wrong",
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/auth/current-user", {
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
      response: error.response.data.message || "something went wrong",
    };
  }
};
