/* eslint-disable no-console */
import Attendance from '../models/Attendance';
import ClassStudent from '../models/ClassStudent';
import dbConfig from '../db/db.config';

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

// TO-DO: create query with replacement or use a stored procedure instead
export const getAttendancesByClass = async (req, res) => {
  try {      
    const query = `SELECT class.name, student.email, student.first_name, student.last_name,
                        attendance.description, SUBSTRING(code.date, 1, 10) AS date,
                        SUBSTRING(code.timeslot, 12, 5) AS timeslot,
                        CASE 
                            WHEN attendance.present<>0 THEN 'Yes'
                            WHEN attendance.present=0 THEN 'No'
                            ELSE 'Unknown'
                        END present
                        FROM attendances AS attendance
                        INNER JOIN codes AS code ON attendance.code_id = code.id
                        INNER JOIN classes AS class ON code.class_id = class.id
                        INNER JOIN users AS student on attendance.student_id = student.id
                        WHERE class.id = ${req.params.id} ORDER BY timeslot`;

    dbConfig.Sequelize.query(query, { raw: true, nest: true })
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
                
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
        code_id: req.body.code_id,
        student_id: req.body.student_id
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

