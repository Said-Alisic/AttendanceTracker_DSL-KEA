import { Attendance  } from '@dsl-app/api-interfaces';
import axios from 'axios';

const URL = 'api/attendances';

export const getAttendances = async () => {
    try {
        return axios.get<Attendance[]>(URL);
    } catch (err) {
        console.log(err);
        
    }
}

export const postAttendance = async (attendance: Attendance) => {
    try {
        return axios.post<Attendance>(URL, attendance);
    } catch (err) {
        console.log(err);
    }
}

export const postAttendanceCode = async (id: number, class_id: number) => {
    try {
        return axios.post(`${URL}/${id}/${class_id}`);
    } catch (err) {
        console.log(err);
    }
}



