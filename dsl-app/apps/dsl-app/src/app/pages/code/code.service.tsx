import { Code  } from '@dsl-app/api-interfaces';
import axios from 'axios';

const URL = 'api/codes';

export const getCodeByString = async (codeString: string) => {
    try {
        return axios.get(`${URL}/code/${codeString}`, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export const postCode = async (code: Code) => {
    try {
        return axios.post<Code>(URL, code, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        });
    } catch (err) {
        console.log(err);
    }
}