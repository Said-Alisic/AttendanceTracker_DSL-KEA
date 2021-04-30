/* eslint-disable no-console */
import Attendance from '../models/Attendance';
import ClassStudent from '../models/ClassStudent';

const getAllClassStudents = (class_id) => {
    try {
        return ClassStudent.findAll({
            where: {
                class_id: class_id
            }
        });
    } catch (err) {
        console.log(err); 
    }
}

export const getAllAttendances = async (req, res) => {
    try {
        await Attendance.findAll()
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                return res.status(404).send(err);
            })
        } catch (err) {
            return res.status(500).json('Internal server error');
        }
    };

export const getAttendance = async (req, res) => {
    try {

        await Attendance.findByPk(req.params.id)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                return res.status(404).send(err);
            })
    } catch (err) {
        return res.status(500).json('Internal server error');
    }
};

export const addAttendance = async (req, res) => {
    try {
        await Attendance.create(req.body)
            .then(data => {
                return res.json(data)
            })
            .catch(err => {
                return res.status(404).send(err);
            })
    } catch (err) {
        return res.status(500).json('Internal server error');
    }
};

export const addDefaultAttendances = async (req, res) => {
    try {
        await getAllClassStudents(req.params.classId).then(data => {   
            data.forEach(student => {
                Attendance.create({ code_id: req.params.codeId, student_id: student.student_id })
                    .catch(err => {
                        console.log(err);      
                    });
            })
            Attendance.findAll({
                    where: {
                        code_id: req.params.codeId
                    }
                })
                .then(data => {
                    return res.status(200).json(data);
                })
                .catch(err => {
                    return res.status(404).send(err);
                })
        }) 
    } catch (err) {
        console.log(err);
        
        return res.status(500).json('Internal server error');
    }
};


export const updateAttendance = async (req, res) => {
    try {
        await Attendance.update(req.body, {
            where: {
                student_id: req.params.id,
                code_id: req.params.id
            }
        }).then(() => {
            return res.status(200).json();
        })
            .catch(err => {
                return res.status(404).send(err);
            });
    } catch (err) {
        return res.status(500).json('Internal server error');
    }
};

