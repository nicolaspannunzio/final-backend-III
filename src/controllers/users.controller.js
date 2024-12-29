import { usersService } from "../services/index.js";
import User from '../dao/models/User.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.send({ status: "success", payload: users });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const newUser = new User({ first_name, last_name, email, password });
        await newUser.save();
        res.status(201).json({
            status: 'success',
            payload: newUser,
        });
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({
            status: 'error',
            message: 'Error creating user',
            error: error.message,
        });
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