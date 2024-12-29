import UserModel from '../dao/models/User.js';
import {faker} from "@faker-js/faker"; 
import { createHash } from "../utils/index.js";

class MockingService {
    static async generateMockingUsers(num) {
        const users = [];
        const hashedPassword = await createHash('coder123');

        // const hashedPassword = await createHash(faker.internet.password());

        for (let i = 0; i < num; i++) {
            const user = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: hashedPassword,
                role: faker.helpers.arrayElement(['user', 'admin']),
                pets: []
            };
            const newUser = await UserModel.create(user);
            users.push(newUser);
        }
        return users;
    }

    static generateMockingPets(count = 10) {
        const pets = [];
        const animalMethods = {
            cat: faker.animal.cat,
            dog: faker.animal.dog,
            bird: faker.animal.bird,
            fish: faker.animal.fish,
            horse: faker.animal.horse
        };
    
        for (let i = 0; i < count; i++) {
            const randomType = faker.helpers.arrayElement(Object.keys(animalMethods));
            
            const name = faker.person.firstName();
            const specie = randomType;
    
            const age = faker.number.int({ min: 1, max: 15 });
            const breed = animalMethods[randomType]();
            const color = faker.color.human();
            const petData = {
                name,
                specie,
                age,
                breed,
                color
            };
                
            if (!petData.name || !petData.specie) {
                console.error("Missing required fields:", petData);
                continue;  
            }
    
            pets.push(petData);
        }
        
        return pets;
    }
}

export default MockingService; 