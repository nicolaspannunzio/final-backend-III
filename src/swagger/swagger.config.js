import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { fileURLToPath } from 'url'; // Import necesario
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación Adoptame",
      description: "App dedicada a encontrar familias para los perritos y gatitos",
    },
  },
  apis: [path.join(__dirname, '../docs/**/*.yaml')], 
};

const specs = swaggerJSDoc(swaggerOptions);

const swaggerDocs = (app) => {
  app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
};

export default swaggerDocs;