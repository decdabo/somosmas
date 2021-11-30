import axios from "axios";

const baseUrl = "http://ongapi.alkemy.org/api";

const Get = async(category, id) => {
    const url = id ? `${baseUrl}/${category}/${id}` : `${baseUrl}/${category}`;
    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        return { success: false, error }
    };
};