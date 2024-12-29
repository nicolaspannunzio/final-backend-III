import userModel from "./models/User.js";

export default class Users {
    
    get = (params) =>{
        return userModel.find(params);
    }

    getBy = (params) =>{
        return userModel.findOne(params);
    }

    save = (doc) =>{
        try {
            return userModel.create(doc);
        } catch (error) {
            console.error('Error al guardar el usuario:', error); 
            throw error;
        }
    }

    update = (id,doc) =>{
        return userModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return userModel.findByIdAndDelete(id);
    }
}