import { usersService } from "../services/index.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.send({ status: "success", payload: users });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Asegúrate de que los campos estén siendo enviados
        if (!name || !email || !password) {
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }
        const newUser = await usersService.create({ name, email, password });
        res.status(201).send({ status: "success", payload: newUser });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) {
            return res.status(404).send({ status: "error", error: "User not found" });
        }
        res.send({ status: "success", payload: user });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const updateBody = req.body;
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) {
            return res.status(404).send({ status: "error", error: "User not found" });
        }
        await usersService.update(userId, updateBody);
        res.send({ status: "success", message: "User updated" });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) {
            return res.status(404).send({ status: "error", error: "User not found" });
        }
        await usersService.delete(userId);  
        res.send({ status: "success", message: "User deleted" });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    createUser
};