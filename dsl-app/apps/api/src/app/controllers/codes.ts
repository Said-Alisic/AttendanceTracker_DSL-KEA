/* eslint-disable no-console */
import { 
  Request, 
  Response 
} from "express";
import dbConfig from '../db/db.config';

export const getAllCodes = async (req: Request, res: Response) => {
  try {
    await dbConfig.Code.findAll()
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

export const getCode = async (req: Request, res: Response) => {
  try {
    await dbConfig.Code.findByPk(req.params.id)
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

export const getCodeByString = async (req: Request, res: Response) => {
  try {      
    await dbConfig.Code.findOne({
      where: {
        code_string: req.params.codeString
      }
    })
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(err => {
        return res.status(404).send(err);
      })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

export const addCode = async (req: Request, res: Response) => {
  try {
    await dbConfig.Code.create(req.body)
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

export const updateCode = async (req: Request, res: Response) => {
  try {
    await dbConfig.Code.update(req.body, {
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

export const deleteCode = async (req: Request, res: Response) => {
  try {
    await dbConfig.Code.destroy({
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

