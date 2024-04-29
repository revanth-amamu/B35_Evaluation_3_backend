const express = require('express');
require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const connection = require('./config/db');
const userRouter = require('./routes/user.route');
const taskRouter = require('./routes/task.route');

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task_Management_System_api',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

const port = process.env.PORT;

app.get('/', (req, res) => {
  try {
    req.status(200).json({ message: "HI 👋 This B35_Evaluation_3_Backend_API...."})
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

app.listen(port, async () => {
    await connection;
    console.log("Connected to DB");
    console.log(`Server is running at port ${port}`);
});