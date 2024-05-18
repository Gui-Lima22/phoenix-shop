import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ProductService =  {
    getById: async (id) => {
        return await axios.get(API_URL + "/products/" + id)
            .then((res) => res)
            .catch((err) => {
                console.error("Failed to fetch product by id:", err);
                throw err;
            })
    },

    list: async () => {
        const model = {
            teamsFilters: null,
            leaguesFilters: null,
            colorsFilters: null,
            orderBy: null
        }

        return await axios.post(API_URL + "/products/list", model)
            .then((res) => res)
            .catch((err) => {
                console.error("Failed to fetch product by id:", err);
                throw err;
            })
    }
};

export default ProductService;