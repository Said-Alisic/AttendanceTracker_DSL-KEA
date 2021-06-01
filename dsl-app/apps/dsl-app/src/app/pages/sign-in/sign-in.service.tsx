import axios from 'axios';

const URL = 'api/users';

// TO-DO: Add interface for credentials
export const signInUser = async (credentials) => {
    try {
        return axios.post(`${URL}/sign-in`, credentials);
    } catch (err) {
        console.log(err);
    }
}
