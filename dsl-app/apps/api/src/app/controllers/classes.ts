/* eslint-disable no-console */
import { 
  Request, 
  Response 
} from "express";
import dbConfig from '../db/db.config';

export const getAllClasses = async (req: Request, res: Response) => {
  try {
    await dbConfig.Class.findAll()
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

export const getAllClassesByTeacher = async (req, res: Response) => {
  try {
    await dbConfig.Class.findAll({
      include: {
        model: dbConfig.ClassTeacher,
        where: {
          teacher_id: req.id,
        },
        attributes: {
          exclude: ['class_id', 'teacher_id'],
        },
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

export const getClass = async (req: Request, res: Response) => {
  try {
    await dbConfig.Class.findByPk(req.params.id)
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

export const addClass = async (req: Request, res: Response) => {
  try {
    await dbConfig.Class.create(req.body)
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

export const updateClass = async (req: Request, res: Response) => {
  try {
    await dbConfig.Class.update(req.body, {
      where: {
        id: req.params.id
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

export const deleteClass = async (req: Request, res: Response) => {
  try {
    await dbConfig.Class.destroy({
      where: {
        id: req.params.id
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

