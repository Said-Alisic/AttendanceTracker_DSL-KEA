import { User } from '@dsl-app/api-interfaces';
import axios from 'axios';

const URL = 'api/users';

export const getUsers = async () => {
    try {
        const u = await axios.get<User[]>(URL, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        });
        return u.data;
    } catch (err) {
        console.log(err);
        
    }
}

// Gets all users with user.role STUDENT
export const getStudents = async () => {
    try {
        return axios.get<User[]>(`${URL}/students`, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        });
    } catch (err) {
        console.log(err);
        
    }
}

// Gets all users with user.role TEACHER
export const getTeachers = async () => {
    try {
        return axios.get<User[]>(`${URL}/teachers`, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        });
    } catch (err) {
        console.log(err);
        
    }
}


export const postUser = async (user: User) => {
    try {
        return axios.post<User>(URL, user, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        });
    } catch (err) {
        console.log(err);
        
    }
}