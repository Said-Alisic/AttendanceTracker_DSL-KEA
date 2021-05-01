/* eslint-disable no-console */
import Code from '../models/Code';

export const getAllCodes = async (req, res) => {
    try {
        await Code.findAll()
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

export const getCode = async (req, res) => {
    try {
        await Code.findByPk(req.params.id)
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

export const getCodeByString = async (req, res) => {
    try {      
        await Code.findOne({
                where: {
                    code_string: req.params.codeString
                }
            })
            .then(data => {
                if(data.validity) { return res.status(200).json(data) }
                else { return res.status(404).json("Code is no longer valid!") }
                
            })
            .catch(err => {
                return res.status(404).send(err);
            })
    } catch (err) {
        return res.status(500).json('Internal server error');
    }
};

export const addCode = async (req, res) => {
    try {
        await Code.create(req.body)
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

export const updateCode = async (req, res) => {
    try {
        await Code.update(req.body, {
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

export const deleteCode = async (req, res) => {
    try {
        await Code.destroy({
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

