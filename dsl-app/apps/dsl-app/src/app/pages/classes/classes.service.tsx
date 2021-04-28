import { Class, User } from '@dsl-app/api-interfaces';
import axios from 'axios';

const URL = 'api/classes';

export const getClasses = async () => {
    try {
        return axios.get<Class[]>(URL);
    } catch (err) {
        console.log(err);
        
    }
}