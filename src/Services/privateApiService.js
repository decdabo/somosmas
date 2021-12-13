import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

const tempToken = "token";

export const getToken = () => {
  const isToken = localStorage.getItem("token");

  if (isToken) {
    const headers = {
      Authorization: `Bearer ${isToken}`,
    };
    return headers;
  } else {
    const headers = {
      Authorization: `Bearer ${tempToken}`,
    };
    return headers;
  }
};

export const Put = async (endPoint, id, body) => {
  const url = id ? `${baseUrl}/${endPoint}/${id}` : `${baseUrl}/${endPoint}`;

  try {
    const response = await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};

export const Get = async (endPoint, id) => {
  const url = id ? `${baseUrl}/${endPoint}/${id}` : `${baseUrl}/${endPoint}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};

export const Delete = async (endPoint, id) => {
  const url = `${baseUrl}/${endPoint}/${id}`;

  try {
    const { data } = await axios.delete(url, {
      headers: {
        Authorization: tempToken,
      },
    });

    return data;
  } catch (error) {
    return { success: false, error };
  }
};

export const Post = async (endPoint, body) => {
  const url = `${baseUrl}/${endPoint}`;

  return axios
    .post(url, body, {
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      return { success: false, err };
    });
};

export const Patch = async (endPoint, id, body) => {
  const url = id ? `${baseUrl}/${endPoint}/${id}` : `${baseUrl}/${endPoint}`;

  try {
    const response = await axios.patch(url, body, {
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};
