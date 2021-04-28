import { User } from '@dsl-app/api-interfaces';
import axios from 'axios';

const URL = 'api/users';

export const getUsers = async () => {
    try {
        return axios.get<User[]>(URL);
    } catch (err) {
        console.log(err);
        
    }
}

export const postUser = async (user: User) => {
    try {
        return axios.post<User>(URL, user );
    } catch (err) {
        console.log(err);
        
    }
}