import {conf} from "@/conf/conf";

const handleResponse = async (response) => {
try {
    let data = null;
    if (response.status !== 204) {
      try {
        data = await response.json();
      } catch (err) {
        console.warn("Failed to parse response:", err);
      }
    }
  
    if (!response.ok) {
      const error = new Error(data?.detail || "An error occurred");
      error.status = response.status;
      error.code = data?.code || "UNKNOWN_ERROR";
      throw error;
    }
  
    return {
      data: data.data,
      status: response.status,
      message: data?.detail || "",
      success: true,
    };
} catch (error) {
  return {
    data: null,
    status: error.status,
    message: error.message,
    success: false,
  };
}
};

const request = async (
  endpoint,
  { method = "GET", body, params, headers = {} } = {},
) => {
try {
    const url = new URL(`${conf.API_BASE_URL}${endpoint}`);
  
    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.append(key, value),
      );
    }
  
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    const response = await fetch(url, options);
    return handleResponse(response);
} catch (error) {
  return {
    data: null,
    status: error.status,
    message: error.message,
    success: false,
  };
}
};

// Public API
export const api = {
  get: (endpoint, params) => request(endpoint, { method: "GET", params }),
  post: (endpoint, body) => request(endpoint, { method: "POST", body }),
  put: (endpoint, body) => request(endpoint, { method: "PUT", body }),
  patch: (endpoint, body) => request(endpoint, { method: "PATCH", body }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
