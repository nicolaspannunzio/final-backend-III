import MockingService from "../services/mocking.js";
import { usersService, petsService } from "../services/index.js";

const validateServices = () => {
    if (!usersService?.create || typeof usersService.create !== "function") {
        throw new Error("User service 'create' method is not properly implemented");
    }
    if (!petsService?.create || typeof petsService.create !== "function") {
        throw new Error("Pet service 'create' method is not properly implemented");
    }
};

const getMockingPets = async (req, res) => {
    try {
        const pets = await MockingService.generateMockingPets(100);
        res.status(200).send({ status: "success", payload: pets });
    } catch (error) {
        console.error("Error generating mock pets:", error);
        res.status(500).send({ status: "error", error: "Error generating mock pets" });
    }
};

const getMockingUsers = async (req, res) => {
    try {
        const users = await MockingService.generateMockingUsers(50);
        res.status(200).send({ status: "success", payload: users });
    } catch (error) {
        console.error("Error generating mock users:", error);
        res.status(500).send({ status: "error", error: "Error generating mock users" });
    }
};

const generateData = async (req, res) => {
    const { users = 10, pets = 10 } = req.body;

    try {
        validateServices();

        const [mockingUsers, mockingPets] = await Promise.all([
            MockingService.generateMockingUsers(users),
            MockingService.generateMockingPets(pets)
        ]);

        const savedUsers = [];
        for (const user of mockingUsers) {
            try {
                const savedUser = await usersService.create(user);
                savedUsers.push(savedUser);
            } catch (error) {
                console.error("Error saving user:", error);
            }
        }

        const savedPets = [];
        for (const pet of mockingPets) {
            try {
                const savedPet = await petsService.create(pet);
                savedPets.push(savedPet);
            } catch (error) {
                console.error("Error saving pet:", error);
            }
        }

        res.status(201).send({
            status: "success",
            message: "Data generated and saved successfully",
            savedUsersCount: savedUsers.length,
            savedPetsCount: savedPets.length
        });
    } catch (error) {
        console.error("Error generating or saving data:", error);
        res.status(500).send({ status: "error", error: "Error generating or saving data" });
    }
};

export default {
    getMockingPets,
    getMockingUsers,
    generateData,
};