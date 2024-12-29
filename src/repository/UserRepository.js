import GenericRepository from "./GenericRepository.js";

export default class UserRepository extends GenericRepository {
    
    constructor(dao) {
        super(dao);
    }

    async create(doc) {
        try {
            return await this.dao.save(doc); 
        } catch (error) {
            throw new Error(error.message);
        }
    }

    getUserByEmail = (email) =>{
        return this.getBy({email});
    };

    getUserById = (id) =>{
        return this.getBy({_id:id})
    };
    
    mockingusers = async (numUsers) => {
        const result = await generateMockUsers(numUsers);
        return result;
    };
}