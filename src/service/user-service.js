import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UserService = {
    save: (formData) => {
        axios.post(API_URL + "/user/create")
            .then((res) => res)
            .catch((err) => {
                console.error("Failed to fetch product by id:", err);
                throw err;
            })
    }
};

export default UserService;