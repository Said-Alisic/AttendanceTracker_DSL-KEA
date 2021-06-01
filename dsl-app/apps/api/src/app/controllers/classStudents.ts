/* eslint-disable no-console */
import { 
  Request, 
  Response 
} from "express";
import dbConfig from '../db/db.config';
import { 
  ClassStudent,
} from '@dsl-app/api-interfaces';

export const getAllClassStudents = async (req: Request, res: Response) => {
  try {
    await dbConfig.ClassStudent.findAll()
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

export const getClassStudent = async (req: Request, res: Response) => {
  try {
    await dbConfig.ClassStudent.findByPk(req.params.id)
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

export const addClassStudents = async (req: Request, res: Response) => {
  try {
    await req.body.student_ids.forEach(student_id => {
      const newClassStudent: ClassStudent = {
        class_id: parseInt(req.params.id),
        student_id: parseInt(student_id),
      }
      dbConfig.ClassStudent.create(newClassStudent)
        .catch(err => {
          console.log(err);
        });
    })          
    return res.status(200).json({
      message: 'Successfully added students to class list.',
    });
  } catch (err) {
    console.log(err);
    
    return res.status(500).json('Internal server error');
  }
};


export const deleteClassStudents = async (req: Request, res: Response) => {
  try {
    await req.body.student_ids.forEach(student_id => {
      dbConfig.ClassStudent.destroy({
        where: {
          class_id: req.params.id,
          student_id: student_id,
        }
      })
        .catch(err => {
          console.log(err);
        });
    });
    return res.status(200).json({
      message: 'Successfully removed students from class list.',
    })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

