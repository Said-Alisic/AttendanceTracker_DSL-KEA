/* eslint-disable no-console */
import { 
  Request, 
  Response 
} from "express";
import dbConfig from '../db/db.config';

// Helper function to get all students of a particular class to help 
// create default attendances for the newly created attendance code
const getAllClassStudents = (class_id: number) => {
  try {
    return dbConfig.ClassStudent.findAll({
      where: {
        class_id: class_id
      }
    });
  } catch (err) {
    console.log(err); 
  }
}

export const getAllAttendances = async (req: Request, res: Response) => {
  try {
    await dbConfig.Attendance.findAll()
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
export const getAttendancesByClass = async (req: Request, res: Response) => {
  try {   
    const query = 'CALL get_attendances_by_class(:class_id);';

    await dbConfig.Sequelize.query(query, {
      replacements: {
        class_id: req.params.id
      },
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

export const getAttendanceByStudentAndCode = async (req: Request, res: Response) => {
  try {
    dbConfig.Attendance.findAll({
      where: {
        code_id: req.params.codeId,
        student_id: req.params.studentId,
      }
    })
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

export const getAttendanceStatsByClass = async (req: Request, res: Response) => {
  try {   
    const query = 'CALL get_attendance_percentage_by_class(:class_id);';

    await dbConfig.Sequelize.query(query, {
      replacements: {
        class_id: req.params.id
      },
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

export const getAttendance = async (req, res) => {
  try {

    await dbConfig.Attendance.findByPk(req.params.id)
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

export const addAttendance = async (req: Request, res: Response) => {
  try {
    await dbConfig.Attendance.create(req.body)
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

// NOTE: Check if works with req: Request, res: Response and parseInt()
export const addDefaultAttendances = async (req: Request, res: Response) => {
  try {
    await getAllClassStudents(parseInt(req.params.classId)).then(data => {   
      data.forEach(student => {
        dbConfig.Attendance.create({ code_id: parseInt(req.params.codeId), student_id: student.student_id })
          .catch(err => {
            console.log(err);
          });
      });
      return res.status(200).json(data);
    })
      .catch(err => {
        return res.status(404).send(err);    
      });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    await dbConfig.Attendance.update(req.body, {
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

