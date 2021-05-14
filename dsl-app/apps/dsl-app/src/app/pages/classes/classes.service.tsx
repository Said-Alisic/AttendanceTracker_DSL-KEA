import { Class } from '@dsl-app/api-interfaces';
import axios from 'axios';

const URL = 'api/classes';

export const getClasses = async () => {
    try { 
        return axios.get<Class[]>(URL, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        });
    } catch (err) {
        console.log(err);      
    }
}