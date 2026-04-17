import axios from "axios";

export const axiosWithAuth = axios.create({
    baseURL: import.meta.env.VIPE_SERVER_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
