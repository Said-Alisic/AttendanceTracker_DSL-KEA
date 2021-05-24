/* eslint-disable no-console */
import ClassTeacher from '../models/ClassTeacher';

export const getAllClassTeachers = async (req, res) => {
  try {
    await ClassTeacher.findAll({})
      .then(data => res.status(200).json({
        message: 'Data retrieved successfully.',
        data: data,
      }));
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

export const getClassTeacher = async (req, res) => {
  try {
    await ClassTeacher.findByPk(req.params.id)
      .then(data => {
        if (data === null) {
          return res.status(404).json({
            message: 'No class teacher found. Please try again.',
          });
        }
        return res.status(200).json({
          message: 'Data retrieved successfully.',
          data: data,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

export const addClassTeacher = async (req, res) => {
  try {
    await ClassTeacher.create(req.body)
      .then(data => {
        return res.status(200).json({
          message: 'Class teacher created successfully.',
          data: data,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};


export const deleteClassTeacher = async (req, res) => {
  try {
    const ct = ClassTeacher.findByPk(req.params.id);
    if (ct) {
      await ClassTeacher.destroy({
        where: {
          class_id: req.params.id,
          teacher_id: req.params.id
        }
      }).then(() => {
        return res.status(200).json({
          message: 'Class Teacher deleted successfully.',
        });
      });
    } else {
      return res.status(404).json({
        message: 'No class teacher found. Please try again.',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};
