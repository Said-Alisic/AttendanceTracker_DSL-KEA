import { Class, ClassStudent, ClassTeacher, User } from '@dsl-app/api-interfaces';
import axios from 'axios';

const URL = 'api/classes';
const URL_TEACHERS = 'api/classTeachers';
const URL_STUDENTS = 'api/classStudents';
const URL_USERS = 'api/users';

export const getAllClasses = async () => {
    try { 
        return axios.get<Class[]>(URL, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            },
        });
    } catch (err) {
        console.log(err);      
    }
}

export const getAllClassesByTeacher = async () => {
    try { 
        return axios.get<Class[]>(`${URL}/teacher`, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            },
        });
    } catch (err) {
        console.log(err);      
    }
}

export const postClass = async (classData: Class) => {
    try {
        return axios.post<Class>(URL, classData, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            },
        });
    } catch (err) {
        console.log(err);
    }
}

export const postClassTeacher = async (classTeacher: ClassTeacher) => {
    try {
        return axios.post<ClassTeacher>(URL_TEACHERS, classTeacher, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            },
        });
    } catch (err) {
        console.log(err);
    }
}

export const getClassStudents = async (class_id: number) => {
    try { 
        return axios.get<User[]>(`${URL_USERS}/classStudents/${class_id}`, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            },
        });
    } catch (err) {
        console.log(err);      
    }
}

export const getPossibleClassStudents = async (class_id: number) => {
    try { 
        return axios.get<User[]>(`${URL_USERS}/possibleClassStudents/${class_id}`, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            },
        });
    } catch (err) {
        console.log(err);      
    }
}

export const postClassStudents = async (class_id: number, student_ids: number[]) => {
    try {
        return axios.post<ClassStudent[]>(`${URL_STUDENTS}/${class_id}`, student_ids, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            },
        });
    } catch (err) {
        console.log(err);
    }
}

export const deleteClassStudents = (class_id: number, student_ids: number[]) => {
    try {
        return axios.post<number[]>(`${URL_STUDENTS}/delete/${class_id}`, student_ids, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            },
        });
    } catch (err) {
        console.log(err);
    }
}
