import chai from "chai";
import chaiHttp from "chai-http";
import supertest from "supertest";
import app from "../src/app.js";  
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

        const userResponse = await requester.post('/api/users').send({
            first_name: randomFirstName,
            last_name: randomLastName,
            email: randomEmail,
            password: faker.internet.password()
        });

        validUserId = userResponse.body.payload?._id;

        const petResponse = await requester.post('/api/pets').send({
            name: faker.animal.cat(),
            specie: "Cat",
            birthDate: faker.date.past().toISOString().split('T')[0]
        });

        validPetId = petResponse.body.payload?._id;

        await requester.post('/api/adoptions').send({
            userId: validUserId,
            petId: validPetId,
            date: faker.date.recent().toISOString().split('T')[0]
        });
    });

    describe("Pet testing", () => {
        it("GET /api/pets you must get the pets properly", async () => {
            const { statusCode, body } = await requester.get("/api/pets");
            expect(statusCode).to.equal(200);
            expect(body).to.have.property("payload").that.is.an("array");
        });

        it("POST /api/pets you must create a pet correctly", async () => {
            const nuevaMascota = { name: "Rita", specie: "Dog", birthDate: "2021-01-01" };
            const { statusCode, body } = await requester.post("/api/pets").send(nuevaMascota);
            expect(statusCode).to.equal(200);
            expect(body.payload).to.have.property("adopted").that.equals(false);
        });
    });

    describe("Users testing", () => {
        it("GET /api/users you must get the users correctly", async () => {
            const { statusCode, body } = await requester.get("/api/users");
            expect(statusCode).to.equal(200);
            expect(body).to.have.property("payload").that.is.an("array");
        });

        it("POST /api/users you must register a user properly", async () => {
            const newUserEmail = `user-${Date.now()}@example.com`;

            const newUser = {
                first_name: "John",
                last_name: "Smith",
                email: newUserEmail,
                password: "234567"
            };

            const response = await requester.post('/api/users').send(newUser);
             
            expect(response.statusCode).to.equal(201);
            expect(response.body.status).to.equal("success");
            expect(response.body.payload).to.have.property("_id");
        });
    });    
});