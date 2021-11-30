import axios from "axios";

const baseUrl = "http://ongapi.alkemy.org/api";

const tempToken = "token";

const Put = async (endPoint, id, body) => {
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

const Get = async (endPoint, id) =>{
  const url = id ? `${baseUrl}/${endPoint}/${id}` : `${baseUrl}/${endPoint}`;

  try {
    const response = await axios.get(url,  {
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return { success: false, error };
  }
}

export { Put, Get };
