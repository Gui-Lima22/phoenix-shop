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
    },

    getUserLogged: async () => {
        return await axios.get(API_URL + "/users/getUserLogged")
            .then((res) => res)
            .catch((err) => {
                throw err;
            })
    },

    edit: async (model) => {
        return await axios.post(API_URL + "/users/update", model)
            .then((res) => res)
            .catch((err) => {
                throw err;
            })
    }
};

export default UserService;