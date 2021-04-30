/* eslint-disable no-console */
import User from '../models/User';

export const getAllUsers = async (req, res) => {
    try {
        await User.findAll()
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                return res.send(err);
            })
        } catch (err) {
            return res.status(500).json('Internal server error');
        }
    };

export const getUser = async (req, res) => {
    try {
        await User.findByPk(req.params.id)
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

// export const getUsersByClass = async (req, res) => {
//     try {
//         await User.findAll({
//             where: {
//                 class_id: req.params.class_id
//             })
//             .then(data => {
//                 return res.status(200).json(data);
//             })
//             .catch(err => {
//                 return res.status(404).send(err);
//             })
//     } catch (err) {
//         return res.status(500).json('Internal server error');
//     }
// }

export const addUser = async (req, res) => {
    try {
        await User.create(req.body)
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

export const updateUser = async (req, res) => {
    try {
        await User.update(req.body, {
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

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
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

