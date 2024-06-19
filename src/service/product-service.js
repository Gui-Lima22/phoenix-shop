import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ProductService =  {
    getById: async (id) => {
        return await axios.get(API_URL + "/products/" + id)
            .then((res) => res)
            .catch((err) => {
                throw err;
            })
    },

    list: async (model) => {
        return await axios.post(API_URL + "/products/list", model)
            .then((res) => res)
            .catch((err) => {
                throw err;
            })
    },

    options: async () => {
        return await axios.get(API_URL + "/products/filterOptions")
            .then((res) => res)
            .catch((err) => {
                throw err;
            })
    },
};

export default ProductService;