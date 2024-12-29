import { adoptionsService } from "../services/index.js"
import mongoose from 'mongoose';
import User from '../dao/models/User.js';
import Pet from '../dao/models/Pet.js';
import Adoption from '../dao/models/Adoption.js';

const getAllAdoptions = async(req,res)=>{
    const result = await adoptionsService.getAll();
    res.send({status:"success",payload:result})
}

const getAdoption = async(req,res)=>{
    try {
        const adoptions = await adoptions.find(); 
        res.status(200).send({ status: 'success', payload: adoptions });
    } catch (error) {
        res.status(500).send({ status: 'error', error: 'Internal Server Error' });
    }
}

const createAdoption = async (req, res) => {
  try {
    const { userId, petId, adoptionDetails } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'userId must be a valid ObjectId' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!mongoose.Types.ObjectId.isValid(petId)) {
      return res.status(400).json({ error: 'petId must be a valid ObjectId' });
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const adoption = new Adoption({
      user: userId,
      pet: petId,
      details: adoptionDetails,
      date: new Date(),  
    });

    await adoption.save();

    const adoptionObj = adoption.toObject();
    adoptionObj.id = adoptionObj._id;
    delete adoptionObj._id;

    res.status(201).json(adoptionObj);
  } catch (error) {
    console.error('Error in createAdoption:', error);
    res.status(500).json({ error: 'Error creating adoption' });
  }
};

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}