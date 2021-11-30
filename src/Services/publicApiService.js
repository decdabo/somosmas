import axios from "axios";

const baseUrl = "http://ongapi.alkemy.org/api";

export const Post = async (endPoint, body) => {
  const url = `${baseUrl}/${endPoint}`;

  try {
    const response = await axios.post(url, body);

    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};



export const Get = async(category, id) => {
    const url = id ? `${baseUrl}/${category}/${id}` : `${baseUrl}/${category}`;
    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        return { success: false, error }
    };
};