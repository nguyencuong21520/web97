import UserModel from "../models/user.model.js";

const userController = {
    getAll: async (req, res) => {
        const users = await UserModel.find();
        return res.json(users);
    },
    getById: async (req, res) => {
        const user = await UserModel.findById(req.params.id);
        return res.json(user);
    },
    update: async (req, res) => {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body);
        return res.json(user);
    },
    delete: async (req, res) => {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        return res.json(user);
    }

}

export default userController