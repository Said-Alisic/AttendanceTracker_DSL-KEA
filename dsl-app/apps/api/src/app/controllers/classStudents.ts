/* eslint-disable no-console */
import ClassStudent from '../models/ClassStudent';

export const getAllClassStudents = async (req, res) => {
  try {
    await ClassStudent.findAll({})
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

export const getClassStudent = async (req, res) => {
  try {
    await ClassStudent.findByPk(req.params.id)
      .then(data => {
        if (data === null) {
          return res.status(404).json({
            message: 'No class student found. Please try again.',
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

export const addClassStudent = async (req, res) => {
  try {
    await ClassStudent.create(req.body)
      .then(data => {
        return res.status(200).json({
          message: 'Class student created successfully.',
          data: data,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

export const deleteClassStudent = async (req, res) => {
  try {
    const cs = ClassStudent.findByPk(req.params.id);
    if (cs) {
      await ClassStudent.destroy({
        where: {
          class_id: req.params.id,
          student_id: req.params.id
        }
      }).then(() => {
        return res.status(200).json({
          message: 'Class student deleted successfully.',
        });
      });
    } else {
      return res.status(404).json({
        message: 'No class student found. Please try again.',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};
