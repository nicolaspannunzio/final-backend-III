import { Router } from "express";
import mocksController from "../controllers/mocks.controller.js";

const router = Router();

router.get("/pets", mocksController.getMockingPets);  
router.get("/users", mocksController.getMockingUsers);  
router.post("/generate", mocksController.generateData);  

export default router;