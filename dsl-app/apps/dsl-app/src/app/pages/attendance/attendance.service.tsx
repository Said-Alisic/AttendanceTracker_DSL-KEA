import { Attendance, UserClassAttendance  } from '@dsl-app/api-interfaces';
import axios from 'axios';

const URL = 'api/attendances';

export const getAttendances = async () => {
    try {
        return axios.get<Attendance[]>(URL, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export const getAttendancesByClass = async (class_id: number) => {
    try {
        return axios.get<Attendance[]>(`${URL}/class/${class_id}`, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export const getAttendanceStatsByClass = async (class_id: number) => {
    try {
        return axios.get<UserClassAttendance[]>(`${URL}/stats/${class_id}`, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        });
    } catch (err) {
        console.log(err);
    }
}


export const postAttendances = async (id: number, class_id: number) => {
    try {
        return axios.post(`${URL}/${id}/${class_id}`, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export const updateAttendance = async (attendance: Attendance) => {
    try {
        return axios.put<Attendance>(URL, attendance, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        });
    } catch (err) {
        console.log(err);
    }
}



