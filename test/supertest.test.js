import chai from "chai";
import chaiHttp from "chai-http";
import supertest from "supertest";
import app from "../src/app.js"; 

const { expect } = chai;
chai.use(chaiHttp);

const requester = supertest(app); 

describe("Testing de la App Web Adoptame", () => {
    let validUserId, validPetId;

    before(async function () {
        this.timeout(5000); 

        const userResponse = await requester.post('/api/users').send({
            first_name: "Juan",
            last_name: "Perez",
            email: "juan.perez@example.com",
            password: "hashedPassword123"
        });
        validUserId = userResponse.body._id;
        //console.log(userResponse.body)
 
        const petResponse = await requester.post('/api/pets').send({
            name: "Luna",
            specie: "Gato",
            birthDate: "2021-03-15"
        });
        validPetId = petResponse.body._id;
    });

    describe("Testing de Pets", () => {
        it("GET /api/pets debe obtener las mascotas correctamente", async () => {
            const { statusCode, body } = await requester.get("/api/pets");
            expect(statusCode).to.equal(200);
            expect(body).to.have.property("payload").that.is.an("array");
        });

        it("POST /api/pets debe crear una mascota correctamente", async () => {
            const nuevaMascota = { name: "Rita", specie: "Perro", birthDate: "2021-01-01" };
            const { statusCode, body } = await requester.post("/api/pets").send(nuevaMascota);
            expect(statusCode).to.equal(200);
            expect(body.payload).to.have.property("adopted").that.equals(false);
        });
    });

    describe("Testing de Users", () => {
        it("GET /api/users debe obtener los usuarios correctamente", async () => {
            const { statusCode, body } = await requester.get("/api/users");
            expect(statusCode).to.equal(200);
            expect(body).to.have.property("payload").that.is.an("array");
        });

        it("POST /api/users debe registrar un usuario correctamente", async () => {
            const mockUsuario = { first_name: "Pepe", last_name: "Argento", email: "newpepe@example.com", password: "1234" };
            const { statusCode, body } = await requester.post("/api/users").send(mockUsuario);
            expect(statusCode).to.equal(201);
            expect(body.payload).to.have.property("email").that.equals(mockUsuario.email);
        });
    });

    describe("Testing de Adoptions", () => {
        it("GET /api/adoptions debe retornar todas las adopciones", async () => {
            const { statusCode, body } = await requester.get("/api/adoptions");
            expect(statusCode).to.equal(200);
            expect(body).to.be.an("array");
        });

        it("POST /api/adoptions debe registrar una adopción correctamente", async () => {
            const nuevaAdopcion = {
                userId: validUserId,
                petId: validPetId,
                date: "2023-12-25"
            };
            const { statusCode, body } = await requester.post("/api/adoptions").send(nuevaAdopcion);
            expect(statusCode).to.equal(201);
            expect(body.payload).to.have.property("userId").that.equals(validUserId);
            expect(body.payload).to.have.property("petId").that.equals(validPetId);
        });
    });
});
