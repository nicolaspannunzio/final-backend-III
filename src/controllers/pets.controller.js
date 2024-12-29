import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import { __dirname } from "../utils/index.js";

const getAllPets = async (req,res) => {
    const pets = await petsService.getAll();
    res.send ({ status:"success",payload:pets })
}

const getAllAdoptions = async (req, res) => {
    try {
        const adoptions = await adoptionsService.getAll();
        res.status(200).json(adoptions);
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const createAdoption = async (req, res) => {
    try {
        const { userId, petId, date } = req.body;
        if (!userId || !petId || !date) {
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }
        const newAdoption = await adoptionsService.create({ userId, petId, date });
        res.status(201).send({ status: "success", payload: newAdoption });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const createPet = async(req,res)=> {
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    const pet = PetDTO.getPetInputFrom({name,specie,birthDate});
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
}

const updatePet = async(req,res) =>{
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    const result = await petsService.update(petId,petUpdateBody);
    res.send({status:"success",message:"pet updated"})
}

const deletePet = async(req,res)=> {
    const petId = req.params.pid;
    const result = await petsService.delete(petId);
    res.send({status:"success",message:"pet deleted"});
}

const createPetWithImage = async(req,res) =>{
    const file = req.file;
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    console.log(file);
    const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image:`${__dirname}/../public/img/${file.filename}`
    });
    console.log(pet);
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
}

export default {
                getAllPets,
                createPet,
                updatePet,
                deletePet,
                createPetWithImage,
                getAllAdoptions,
                createAdoption 
}