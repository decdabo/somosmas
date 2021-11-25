import axios from "axios";
import {
  categoryPutApiRequest,
  categoryPostApiRequest,
} from "../../schemas/privateApi/categoryApiSchemas";

const BASE_URL = "http://ongapi.alkemy.org/api";

/*

INPUTS:
categoryObject => object => {
    id: => number
    name: => string,
    description: => string,
    image: => string (blob, base64),
}


OUTPUTS => response message from api or error.


*/

const modifyCategory = (categoryObject) => {
  return new Promise((resolve, reject) => {
    categoryPutApiRequest
      .validate(categoryObject)
      .then(() => {
        axios
          .put(`${BASE_URL}/categories/${categoryObject.id}`, categoryObject)
          .then((res) => {
            if (res.status === 200) {
              resolve(res.data.message);
            } else {
              reject(res.data.message);
            }
          })
          .catch((err) => {
            reject(err.message);
          });
      })
      .catch((error) => reject(error.message));
  });
};

/*

INPUTS:
categoryObject => object => {
    name: => string,
    description: => string,
    image: => string (blob, base64),
}


OUTPUTS => response message from api or error.


*/

const uploadCategory = (categoryObject) => {
  return new Promise((resolve, reject) => {
    categoryPostApiRequest
      .validate(categoryObject)
      .then(() => {
        axios
          .post(`${BASE_URL}/categories`, categoryObject)
          .then((res) => {
            if (res.status === 200) {
              resolve(res.data.message);
            } else {
              reject(res.data.message);
            }
          })
          .catch((err) => reject(err.message));
      })
      .catch((error) => reject(error.message));
  });
};

export { modifyCategory, uploadCategory };
