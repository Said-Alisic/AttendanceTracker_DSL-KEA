/* eslint-disable no-console */
import dbConfig from '../db/db.config';

export const getAllClassTeachers = async (req, res) => {
  try {
    await dbConfig.ClassTeacher.findAll()
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

export const getClassTeacher = async (req, res) => {
  try {
    await dbConfig.ClassTeacher.findByPk(req.params.id)
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

export const addClassTeacher = async (req, res) => {
  try {
    await dbConfig.ClassTeacher.create(req.body)
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


export const deleteClassTeacher = async (req, res) => {
  try {
    await dbConfig.ClassTeacher.destroy({
      where: {
        class_id: req.params.classId,
        teacher_id: req.params.teacherId,
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

