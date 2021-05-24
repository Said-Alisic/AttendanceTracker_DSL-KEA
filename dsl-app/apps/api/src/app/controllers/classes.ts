/* eslint-disable no-console */
import Class from '../models/Class';

export const getAllClasses = async (req, res) => {
  try {
    await Class.findAll({})
      .then(data => res.status(200).json({
        message: 'Data retrieved successfully.',
        data,
      }));
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

export const getClass = async (req, res) => {
  try {
    await Class.findByPk(req.params.id)
      .then(data => {
        if (data === null) {
          return res.status(404).json({
            message: 'No class found. Please try again.',
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

export const addClass = async (req, res) => {
  try {
    await Class.create(req.body)
      .then(data => {
        return res.status(200).json({
          message: 'Class created successfully.',
          data: data,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

export const updateClass = async (req, res) => {
  try {
    const c = await Class.findByPk(req.params.id);
    if (c) {
      await Class.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(() => {
        return res.status(200).json({
          message: 'Class updated successfully.',
          data: req.body,
        });
      });
    } else {
      return res.status(404).json({
        message: 'No class found. Please try again.',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const c = await Class.findByPk(req.params.id);
    if (c) {
      await Class.destroy({
        where: {
          id: req.params.id
        }
      }).then(() => {
        return res.status(200).json({
          message: 'Class deleted successfully.',
        });
      })
    } else {
      return res.status(404).json({
        message: 'No class found. Please try again.',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};
