import chai from "chai";
import chaiHttp from "chai-http";
import supertest from "supertest";
import app from "../src/app.js";
import userModel from '../src/dao/models/User.js';
import petModel from '../src/dao/models/Pet.js';
import { faker } from "@faker-js/faker";

const { expect } = chai;
chai.use(chaiHttp);

const requester = supertest(app);

describe("Testing of the Adopt Me Web App", () => {
    let validUserId, validPetId;

    before(async function () {
        this.timeout(5000);

        const randomEmail = `user-${Date.now()}@example.com`; 
        const randomFirstName = faker.person.firstName();
        const randomLastName = faker.person.lastName();
        const randomPetName = `pet-${Date.now()}`;
        
        const userResponse = await requester.post('/api/users').send({
            first_name: randomFirstName,
            last_name: randomLastName,
            email: randomEmail,
            password: faker.internet.password(8),
        });
        validUserId = userResponse.body._id;

        const petResponse = await requester.post('/api/pets').send({
            name: randomPetName,
            specie: faker.animal.type(),
            birthDate: faker.date.past(5).toISOString().split('T')[0],
        });
        validPetId = petResponse.body._id;
    });

    it("GET /api/adoptions should return all adoptions", async () => {
        const { statusCode, body } = await requester.get("/api/adoptions");
        expect(statusCode).to.equal(200);
        expect(body).to.have.property("payload").that.is.an("array");
    });

    it("POST /api/adoptions should register an adoption properly", async () => {
        const user = await userModel.create({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: `test-${Date.now()}@example.com`,
            password: faker.internet.password(10),
        });

        const pet = await petModel.create({
            name: `pet-${Date.now()}`,
            specie: faker.animal.type(),
            birthDate: faker.date.past(4).toISOString().split('T')[0],
        });

        const response = await requester.post(`/api/adoptions/${user._id}/${pet._id}`).send({
            userId: user._id,
            petId: pet._id,
            adoptionDetails: 'Adoption details',
        });

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("id");
    });
});