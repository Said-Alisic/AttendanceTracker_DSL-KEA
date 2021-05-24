import classes from '*.module.styl';
import { Class, ClassStudent, ClassTeacher } from '@dsl-app/api-interfaces';
import axios from 'axios';

const URL = 'api/classes';
const URL_TEACHERS = 'api/classTeachers';
const URL_STUDENTS = 'api/classStudents';

export const getClasses = async () => {
    try {
        const found =  await axios.get<Class[]>(URL, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        });
        return found.data;
    } catch (err) {
        console.log(err);      
    }
}

export const postClass = async (classData: Class) => {
    try {
        return axios.post<Class>(URL, classData, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
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
            }
        })
    } catch (err) {
        console.log(err);
    }
}

export const postClassStudents = async (classStudents: ClassStudent[]) => {
    try {
        return axios.post<ClassStudent[]>(URL_TEACHERS, classStudents, {
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('authUser')).auth_token,
            }
        })
    } catch (err) {
        console.log(err);
    }
}
