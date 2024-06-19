import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UserService = {
    save: async (model) => {
        return await axios.post(API_URL + "/auth/create", model)
            .then((res) => res)
            .catch((err) => {
                throw err
            });
    },

    login: async (model) => {
        return await axios.post(API_URL + "/auth/login", model)
            .then((res) => res)
            .catch((err) => {
                throw err;
            })
    }
};

export default UserService;