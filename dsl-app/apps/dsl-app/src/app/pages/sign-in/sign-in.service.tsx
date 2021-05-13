import { User } from '@dsl-app/api-interfaces';
import axios from 'axios';

const URL = 'api/users';

export const signInUser = async () => {
    try {
        return axios.get<User>(`${URL}/sign-in`);
    } catch (err) {
        console.log(err);
    }
}

export const signOutUser = async () => {
    try {
        return axios.get<User[]>(`${URL}/sign-out`);
    } catch (err) {
        console.log(err); 
    }
}
