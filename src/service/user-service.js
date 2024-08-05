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
        return await axios.get(API_URL + "/auth/getUserLogged")
            .then((res) => res)
            .catch((err) => {
                throw err;
            })
    },

    edit: async (model) => {
        return await axios.post(API_URL + "/user/update", model)
            .then((res) => res)
            .catch((err) => {
                throw err;
            })
    },

    authValidate: async (token) => {
        const requestOptions = {
            method: "POST",
            headers: new Headers(),
            body: token,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${API_URL}/auth/validate`, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.text();
        } catch (err) {
            throw new Error('Failed to validate token');
        }
    }
};

export default UserService;