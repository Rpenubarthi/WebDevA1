/* eslint-disable */
import axios from "axios";
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const signin = async (credentials: any) => {
    const response = await axios.post(`${USERS_API}/signin`, credentials);
    return response.data;
};
export const signup = async (user: any) => {
    const response = await axios.post(`${USERS_API}/signup`, user);
    return response.data;
};

export function updateUser(profile: any) {
    throw new Error("Function not implemented.");
}
export const profile = async () => {
    const response = await axios.post(`${USERS_API}/profile`);
    return response.data;
};


