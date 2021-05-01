import { Code  } from '@dsl-app/api-interfaces';
import axios from 'axios';

const URL = 'api/codes';

export const getCodeByString = async (codeString) => {
    try {
        return axios.get(`${URL}/code/${codeString}`);
    } catch (err) {
        console.log(err);
    }
}

export const postCode = async (code: Code) => {
    try {
        return axios.post<Code>(URL, code);
    } catch (err) {
        console.log(err);
    }
}